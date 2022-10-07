export const {ENV = 'development'} = process.env
export const IS_DEV = ENV !== 'production'
export const {LOG_LEVEL = 'trace'} = process.env

const port = Number(process.env.PORT)
export const PORT = isNaN(port) ? 3000 : port

export const {KAFKA_URL = '127.0.0.1:9092'} = process.env

const emailsToPrepare = Number(process.env.EMAILS_TO_PREPARE)
export const EMAILS_TO_PREPARE = isNaN(emailsToPrepare) ? 10 : emailsToPrepare
