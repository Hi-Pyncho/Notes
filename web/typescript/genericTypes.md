# generic types

```ts
const arrNum: Array<number> = [1, 1, 2, 3, 5];
const arrStr: Array<string> = ['Hi', 'Bob'];

function reverse<T>(array: T[]): T[] {
  return array.reverse();
}
reverse(arrNum);
reverse(arrStr);
```
