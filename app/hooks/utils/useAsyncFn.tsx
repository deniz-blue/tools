import { useState } from "react";

type AsyncFn<Args extends any[], U> = (...args: Args) => Promise<U>;

export const useAsyncFn = <
    Args extends any[],
    Ret,
>(fn: AsyncFn<Args, Ret>): [AsyncFn<Args, Ret>, { running: boolean, error: any }] => {
    const [running, setRunning] = useState(false);
    const [error, setError] = useState<any>(null);

    const exec = async (...args: Args): Promise<Ret> => {
        setRunning(true);
        setError(null);
        try {
            const ret = await fn(...args);
            setRunning(false);
            return ret;
        } catch(e) {
            setRunning(false);
            setError(e);
            throw e;
        }
    };

    return [
        exec,
        {
            running,
            error,
        },
    ];
};
