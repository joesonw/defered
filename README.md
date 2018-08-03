

defered is a type safe (for typescript) library for go like defer functionalities.


`npm i defered`

```ts
import * as defered from 'defered';

const test = defered.sync((defer) => (name: string): string => {
    defer((result, err) => {
        if (err) {
            return 'something went wrong';
        }
        return 'nihao, ' + name;
    }) // last 
    defer((result, err) => {
        if (err) {
            return 'something went wrong';
        }
        return 'hola, ' + name;
    }) // first 
    if (Date.now() % 2 == 1) throw new Error('oops');
    return 'hello,' + name;
});

const test2 = defered.async((defer) => async (name: string): string => {
    defer(async (result, err) => {
        if (err) {
            return 'something went wrong';
        }
        return 'nihao, ' + name;
    })
    if (Date.now() % 2 == 1) throw new Error('oops');
    return 'hello,' + name;
});

test('xiaoming'); // should be 'nihao, xiaoming' or 'something went wrong'
testAynsc('xiaoming2').then(...);
```