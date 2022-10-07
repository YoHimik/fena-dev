import next from 'next'
import {IS_DEV, PORT} from "./env";
import {logger} from "./logger";

const nextLogger = logger.child({
    service: 'next'
})

const loggerLevelByNextLevel = (nextLevel: string) => {
    switch (nextLevel) {
        case 'event -':
        case 'info  -':
        case 'ready -':
            return 'info'
        case 'wait  -':
        case 'trace -':
            return 'trace'
        default:
            return null
    }
}

export const app = next({
    dev: IS_DEV,
    port: PORT,
})

console.log = (...args: any[]) => {
    const [event, msg, ...logData] = args
    const level = loggerLevelByNextLevel(event)
    const logObj: {nextEvent?: string, logData?: any[]} = {}
    if (logData?.length) {
        logObj.logData = logData
    }
    if (!level) {
        logObj.nextEvent = event
        nextLogger.warn(logObj, msg)
        return;
    }
    nextLogger[level](logObj, msg)
}

console.warn = (...args: any[]) => {
    const [, msg, logData] = args
    if (logData?.length) {
        nextLogger.warn({logData}, msg)
    } else {
        nextLogger.warn(msg)
    }
}

console.error = (...args: any[]) => {
    const [, msg, ...logData] = args
    if (logData?.length) {
        nextLogger.error({logData}, msg)
    } else {
        nextLogger.error(msg)
    }
}
