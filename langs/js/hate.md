# HATE

## Date (пуленепробиваемый)
```js
new Date(null).getFullYear() // 1970
new Date(1).getFullYear() // 1970
new Date(true).getFullYear() // 1970
new Date(false).getFullYear() // 1970
new Date('0').getFullYear() // 2000
new Date('1').getFullYear() // 2001
new Date('33').getFullYear() // 2033
new Date([66]).getFullYear() // 1966
new Date('111').getFullYear() // 111
new Date().getFullYear() // current year
new Date(undefined).getFullYear() // NaN
new Date('wtf').getFullYear() // NaN
new Date(function() {}).getFullYear() // NaN
new Date([]).getFullYear() // NaN
new Date({}).getFullYear() // NaN
```

## typeof null
```js
const empty = null;

if (typeof empty === 'object') {
  console.log('not empty') // will execute
}
```

## Math.max/min
```js
Math.max() // -Infinity
Math.min() // Infinity
Math.max(undefined, 1) // NaN
Math.max(null, 1) // 1
```

## setTimeout Infinity
```js
setTimeout(() =>{
  console.log('instantly executed')
}, Infinity);
```

## sort
```js
[1, 2, 10].sort() // => [ 1, 10, 2 ]
```

## toFixed
```js
12.354554.toFixed(2) // => string type return
```

## Array.fill (shallow copy)
```js
const arr = new Array(5).fill({});
arr[0].a = "Hi";
console.log(arr[2].a); // => "Hi"
```
