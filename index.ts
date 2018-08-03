
export type Defer = (fn: (result: any, err: Error) => any) => void;

export function sync<T>(cb: (defer: Defer) => T): T {
    const defers: any[] = [];
    const f = cb((defer: any) => defers.push(defer)) as any;
    return ((...args: any[]) => {
        let err: Error = undefined;
        let result: any = undefined;
        try {
            result = f(...args);
        } catch (e) {
            err = e;
        }
        for (const defer of defers.reverse()) {
            try {
                result = defer(result, err);
                err = undefined;
            } catch (e) {
                err = e;
            }
        }
        if (err) {
            throw err
        }
        return result;
    }) as any;
}

export function async<T>(cb: (defer: Defer) => T): T {
    const defers: any[] = [];
    const f = cb((defer: any) => defers.push(defer)) as any;
    return (async (...args: any[]) => {
        let err: Error = undefined;
        let result: any = undefined;
        try {
            result = await f(...args);
        } catch (e) {
            err = e;
        }
        for (const defer of defers.reverse()) {
            try {
                result = await defer(result, err);
                err = undefined;
            } catch (e) {
                err = e;
            }
        }
        if (err) {
            throw err
        }
        return result;
    }) as any;
}
