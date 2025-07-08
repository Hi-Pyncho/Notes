# Text

## Шрифт
Установка своего шрифта возможна с помощью [FontFace API](https://developer.mozilla.org/en-US/docs/Web/API/FontFace)

```js
let font = new FontFace("test", "url(x)");

font.load().then(() => {
  // Место для отрисовки текста с нужным шрифтом
});
```

## Свойства

Font
```js
ctx.font = 'font-weight font-size font-family';
// пример
ctx.font = "bold 48px serif";
```

textAlign
```js
ctx.textAlign = 'left|right|center|start|end'; // default 'start'
```

textBaseline
```js
ctx.textBaseline = 'top|hanging|middle|alphabetic|ideographic|bottom'; // default 'alphabetic'
```

## Методы

Текст c заливкой
```js
ctx.fillText(text, x, y, maxWidth?);
// пример
ctx.fillText("Hello world", 50, 90);
```

Текст без заливки с обводкой
```js
ctx.strokeText(text, x, y, maxWidth?);
// пример
ctx.strokeText('Hello', 10, 10);
```

Получение информации о тексте (ширина и т.д.)
```js
ctx.measureText(text);
// пример
const text = ctx.measureText('Hello World');
```


