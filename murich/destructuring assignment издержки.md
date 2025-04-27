#perfomance 

Создание переменных через `destructuring assignment` вроде

```js
const [one, two] = [1, 2, 3];
```

заставляют движок, следуя [спеке](https://tc39.es/ecma262/#prod-ArrayAssignmentPattern) создавать цикл для перебора и биндинга значений
в отличие от такого варианта

```js
const { 0: one, 1: two } = [1, 2, 3];
```