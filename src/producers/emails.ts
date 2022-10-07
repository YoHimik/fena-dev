import {createProducer, Message, TOPICS} from "../config/kafka";

const producer = createProducer()

export const publishPrepareEmails = (id: string) => {
    return producer(TOPICS.EMAILS_PREPARE.topic, [{
        key: id,
        data: {
            id,
        }
    }])
}

export const publishSendEmail = (emails: Message[]) => {
    return producer(TOPICS.EMAILS_SEND.topic, emails)
}
