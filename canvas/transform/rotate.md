# Rotate

Поворачивает объект по часовой стрелке.

Функция преобразования градусов в радианы
```js
function degreeToRadian(degree) {
  return degree * Math.PI / 180;
}
```

Функция для переворачивания
```js
ctx.rotate(radians);
```

## Примеры:

Рисуем полукруг, перевернутый на 90 градусов от центра
```js
ctx.save();
ctx.beginPath();
ctx.translate(100, 100);
ctx.rotate(degreeToRadian(90));
ctx.translate(-100, -100);
ctx.arc(100, 100, 50, 0, Math.PI);
ctx.stroke();
ctx.restore();
```
