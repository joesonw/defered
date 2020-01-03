import * as defered from './index';

const t1 = defered.sync(defer => (name: string): string => {
    defer((result, e) => {
        if (result !== 'hello,' + name) throw new Error('t1 failed');
        if (e) throw e;
        return 'nihao,' + name;
    });
    return 'hello,' + name;
});

const t2 = defered.sync(defer => (name: string): string => {
    defer((result, e) => {
        if (result !== undefined) throw new Error('t2 failed');
        if (e.message !== 'test error') throw e;
        return 'nihao,' + name;
    });
    throw new Error('test error')
});

const t3 = defered.async(defer => async (name: string): Promise<string> => {
    defer(async (result, e) => {
        if (result !== 'hello,' + name) throw new Error('t3 failed');
        if (e) throw e;
        await new Promise(r => setTimeout(r, 1000));
        return 'nihao,' + name;
    });
    await new Promise(r => setTimeout(r, 1000));
    return 'hello,' + name;
});

const t4 = defered.async(defer => async (name: string): Promise<string> => {
    defer(async (result, e) => {
        if (result !== undefined) throw new Error('t4 failed');
        if (e.message !== 'test error') throw new Error('t4 failed');
        await new Promise(r => setTimeout(r, 1000));
        return 'nihao,' + name;
    });
    await new Promise(r => setTimeout(r, 1000));
    throw new Error('test error')
});

t1('xiaoming');
console.log('t1 success');
t2('xiaoming');
console.log('t2 success');
t3('xiaoming').then(() => console.log('t3 success'));
t4('xiaoming').then(() => console.log('t4 success'));