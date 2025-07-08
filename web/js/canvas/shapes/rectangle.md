# Rectangle

Методы рисования прямоугольника.
```js
ctx.rect(xPosition, yPosition, width, height);
ctx.roundRect(xPosition, yPosition, width, height, number|number[]);
ctx.strokeRect(xPosition, yPosition, width, height);
```

## Примеры

С заливкой:
```js
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, 100, 100);

// или

ctx.fillStyle = '#fff';
ctx.rect(0, 0, 100, 100);
ctx.fill();
```

С заливкой с скругленными углами
```js
ctx.fillStyle = 'green';
ctx.beginPath();
ctx.roundRect(10, 10, 200, 100, [0, 30]);
ctx.closePath();
ctx.fill();
```

Без заливки с обводкой:
```js
ctx.strokeStyle = '#fff';
ctx.lineWidth = 5;
ctx.lineJoin = 'round'; // 'bevel' || 'round' || 'miter'
ctx.rect(10, 10, 100, 100);
ctx.stroke();

// или

ctx.strokeStyle = 'green';
ctx.strokeRect(20, 10, 160, 100);
```

С обводкой с скругленными углами
```js
ctx.strokeStyle = 'green';
ctx.beginPath();
ctx.roundRect(10, 10, 200, 100, [0, 30, 50, 60]);
ctx.closePath();
ctx.stroke();
```
