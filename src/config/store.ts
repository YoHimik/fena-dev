import {AsyncLocalStorage} from "node:async_hooks";
import { Logger } from "pino";
import {generateTraceId, logger} from "./logger";

export type RunWithStoreCallback<R, A extends unknown[]> = (...args: A) => R
type Store = Map<string, unknown>

const appStorage = new AsyncLocalStorage();

const LOGGER_KEY = 'logger'
const TRACE_ID_KEY = 'trace_id'

export interface StoreOptions {
    traceId?: string
    baseLogger?: Logger
}

export const runWithStore = <R, A extends unknown[]>(options: StoreOptions | undefined, callback: RunWithStoreCallback<R, A>, ...args: A): R => {
    const store: Store = new Map()

    const traceIdToUse = options?.traceId || generateTraceId()
    store.set(TRACE_ID_KEY, traceIdToUse)

    const childLogger = (options?.baseLogger || logger).child({
        traceId: traceIdToUse,
    })
    store.set(LOGGER_KEY, childLogger)

    return appStorage.run(store, callback, ...args)
}

const getByKeyWithDefault = <R>(key: string, defaultValue: R): R => {
    const store = appStorage.getStore() as Store;
    if (!store) return defaultValue;

    const value = store.get(key) as R;
    if (!value) return defaultValue;

    return value;
}

export const getLogger = () => {
    return getByKeyWithDefault(LOGGER_KEY, logger)
}

export const getTraceId = () => {
    return getByKeyWithDefault(TRACE_ID_KEY, generateTraceId())
}
