import {useCallback, useRef, useState} from 'react';

type ResultType<F> = F extends (...args: any) => Promise<infer R> ? R : never;

type AsyncFunction = (...args: any[]) => Promise<any>;

type UseAsyncValue<F extends AsyncFunction, R, E> = [
    (...args: Parameters<F>) => void,
    boolean,
        R | undefined,
        E | undefined,
    () => void,
];

type AsyncData<R, E> = {
    result?: R,
    error?: E,
    processing: boolean
};

const DEFAULT_DATA = {
    processing: false,
};

export const useAsync = <F extends AsyncFunction, R extends ResultType<F>, E = unknown>(asyncFunc: F)
    : UseAsyncValue<F, R, E> => {
    const [data, setData] = useState<AsyncData<R, E>>(DEFAULT_DATA);
    const processingRef = useRef<boolean>(false);

    const runAsync = useCallback(async (...args: any[]) => {
        if (processingRef.current) return;

        processingRef.current = true;
        setData({processing: true});

        try {
            const res = await asyncFunc(...args);
            setData({result: res, processing: false});
        } catch (e) {
            setData({error: e as E, processing: false});
        }

        processingRef.current = false;
    }, [asyncFunc]);

    const run = useCallback((...args: any[]) => {
        runAsync(...args);
    }, [runAsync]);

    const reset = useCallback(() => setData(DEFAULT_DATA), []);

    return [run, data.processing, data.result, data.error, reset];
}
