#perfomance 

Так как анализ и парсинг js кода - задача сложная, его можно упростить, обернув конструкции в `JSON.parse`, так как JSON более строгий формат и его легче парсить.

```js
JSON.parse(`
	[
		{
			name: 'bob',
			...
		}
	]
`);
```