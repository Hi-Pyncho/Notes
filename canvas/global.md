# Глобальные настройки канваса

## GlobalCompositeOperation
Свойство globalCompositeOperation устанавливает/возвращает то, как исходное (новое) изображение нарисовано на целевом (существующем) изображении.

`source` - рисунок, который уже размещен на холсте.
`destination` - рисунок, который вы планируете поместить на холсте.

![Alt text](/images/canvas/GlobalCompositeOperation.png)

## GlobalAlpha
Свойство `CanvasRenderingContext2D.globalAlpha` Canvas 2D API определяет альфа-(прозрачность) значение, которое будет применено к фигурам и картинкам до того как они будут отрисованы на холсте.

```js
ctx.globalAlpha = value; // от 0.0 до 1.0
```

## FillStyle
Свойство определяет цвет, [градиент](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) или [паттерн](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern) для использования внутри фигур. По умолчанию `#000`.

```js
ctx.fillStyle = value;
```

## Filter
Применяет эффекты фильтров, как в css свойстве [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
