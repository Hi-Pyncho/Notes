# Scale

Функция для изменения пропорций объекта
```js
ctx.scale(x, y);
```

## Примеры

Эллипс растянутый по вертикали
```js
ctx.save();
ctx.beginPath();
ctx.translate(200, 200);
ctx.scale(1, 2);
ctx.translate(-200, -200);
ctx.ellipse(200, 200, 50, 75, 0, 0, 2 * Math.PI);
ctx.stroke();
ctx.restore();
```
