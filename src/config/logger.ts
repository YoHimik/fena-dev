import pino from 'pino'
import {LOG_LEVEL} from './env';
import {generateRandomString} from "../utils";

export const logger = pino({
    level: LOG_LEVEL
})

export const generateTraceId = () => {
    return generateRandomString()
}
