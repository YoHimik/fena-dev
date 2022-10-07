import {EachMessagePayload, Kafka, LogEntry, logLevel, Consumer, Producer} from 'kafkajs'
import {KAFKA_URL} from './env'
import {logger} from "./logger";
import {getLogger, getTraceId} from "./store";

const consumers: Consumer[] = []
const producers: Producer[] = []

export interface Message {
    key: string
    data: unknown
}

const toPinoLogLevel = (level: logLevel) => {
    switch (level) {
        case logLevel.ERROR:
        case logLevel.NOTHING:
            return 'error'
        case logLevel.WARN:
            return 'warn'
        case logLevel.INFO:
            return 'info'
        case logLevel.DEBUG:
            return 'debug'
        default:
            return 'warn'
    }
}

const logCreator = () => {
    const kafkaLogger = logger.child({
        service: 'kafka',
    })

    return ({namespace, level, log}: LogEntry) => {
        const pinoLevel = toPinoLogLevel(level)
        kafkaLogger[pinoLevel]({
            namespace,
            log,
        }, log.message)
    }
}

const kafka = new Kafka({
    clientId: 'fena-dev',
    brokers: [KAFKA_URL],
    logCreator,
})

const admin = kafka.admin()

export const TOPICS = {
    EMAILS_PREPARE: {
        topic: 'emails.prepare',
        numPartitions: 1,
        replicationFactor: 1
    },
    EMAILS_SEND: {
        topic: 'emails.send',
        numPartitions: 1,
        replicationFactor: 1
    }
}

export const declareTopics = async () => {
    await admin.createTopics({
        topics: Object.values(TOPICS)
    })
    await admin.disconnect()
}

export const createProducer = () => {
    const producer = kafka.producer()
    const connectPromise = producer.connect()
    producers.push(producer)

    return async (topic: string, messages: Message[]) => {
        await connectPromise
        getLogger().trace({
            topic,
            messages
        }, 'producing message')
        const traceId = getTraceId()
        const messagesToSend = messages.map(m => ({
            key: m.key,
            value: Buffer.from(JSON.stringify(m.data)),
            headers: {
                traceId,
            }
        }))
        await producer.send({
            topic,
            messages: messagesToSend
        })
    }
}

const processEachMessage = async <A, R>(payload: EachMessagePayload, handler: (message: A) => R) => {
    try {
        getLogger().trace({
            payload: {
                topic: payload.topic,
                partition: payload.partition,
                message: {
                    key: payload.message.key?.toString(),
                    timestamp: payload.message.timestamp,
                    attributes: payload.message.attributes,
                    size: payload.message.size,
                    offset: payload.message.offset,
                }
            },
        }, 'incoming message')
        if (!payload.message.value) {
            getLogger().warn('received message with empty payload')
            return
        }
        const data = JSON.parse(payload.message.value.toString())
        await handler(data)
    } catch (e) {
        getLogger().error(e, 'error occurred during message processing')
    } finally {
        getLogger().trace('finished processing message')
    }
}

export const createConsumer = async <A, R>(groupId: string, topic: string, handler: (message: A) => R) => {
    const consumer = kafka.consumer({
        groupId,
    })
    await consumer.connect()
    consumers.push(consumer)
    await consumer.subscribe({topic, fromBeginning: true})
    await consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
            await processEachMessage(payload, handler)
        }
    })
}

export const stopConsumers = () => {
    return Promise.all(consumers.map(c => c.disconnect()))
}

export const stopProducers = () => {
    return Promise.all(producers.map(p => p.disconnect()))
}
