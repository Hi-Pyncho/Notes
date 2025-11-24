#beforeruntime 

```js
function do() {
	const num = 1;
	let num = 2;
	// SyntaxError
}

function do() {
	const num = 1;
	num = 2;
	// no SyntaxError на этапе static semantics. ошибка уже на runtime
}
```