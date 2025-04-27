# Image

## DrawImage
Метод `drawImage()` рисует изображение, содержимое другого элемента `<canvas>` или видео.

Также, метод `drawImage()` может нарисовать часть изображения и/или увеличить/уменьшить размер изображения.

__Внимание:__ Нельзя вызывать метод `drawImage()` прежде, чем изображение будет загружено. Чтобы убедиться, что изображение было загружено, вызов метода `drawImage()` можно поместить внутри события `window.onload()` или `document.getElementById("imageID").onload`.

```js
ctx.drawImage(img, x, y, width, height);
```

### Примеры
```js
window.onload = function() {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const img = document.getElementById('scream');
  ctx.drawImage(img, 10, 10);
};
```

## CreatePattern
Метод `createPattern()` размножает заданный элемент в заданном направлении.

В качестве размножаемого элемента можно использовать изображение, видео или другой элемент `<canvas>`.

Размножаемый элемент может использоваться для рисования/заливки прямоугольников, окружностей, линий и т.д.

```js
ctx.createPattern(image, 'repeat | repeat-x | repeat-y | no-repeat');
```

### Примеры
```js
const img = document.getElementById('lamp');
const pattern = ctx.createPattern(img, 'repeat');
ctx.rect(0, 0, 150, 100);
ctx.fillStyle = pattern;
ctx.fill();
```
![Alt text](../images/canvas/pattern.png)
