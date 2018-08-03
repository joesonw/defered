

defered is a type safe (for typescript) library for go like defer functionalities.


`npm i defered`

```ts
import * as defered from 'defered';

const test = defered.sync((defer) => (name: string): string => {
    defer(e => {
        if (e) {
            return 'something went wrong';
        }
        return 'nihao, ' + name;
    })
    if (Date.now() % 2 == 1) throw new Error('oops');
    return 'hello,' + name;
});

const test2 = defered.async((defer) => async (name: string): string => {
    defer(async e => {
        if (e) {
            return 'something went wrong';
        }
        return 'nihao, ' + name;
    })
    if (Date.now() % 2 == 1) throw new Error('oops');
    return 'hello,' + name;
});

test('xiaoming');
testAynsc('xiaoming2').then(...);
```