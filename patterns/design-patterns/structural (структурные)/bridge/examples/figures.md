# Фигуры и способы их отрисовки

```js
// Реализация (Implementor)
class Renderer {
  renderCircle(radius) {
    throw new Error("Method 'renderCircle' must be implemented");
  }
}

// Конкретные реализации (Concrete Implementors)
class VectorRenderer extends Renderer {
  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius} using vectors`);
  }
}

class RasterRenderer extends Renderer {
  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius} using pixels`);
  }
}

// Абстракция (Abstraction)
class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }

  draw() {
    throw new Error("Method 'draw' must be implemented");
  }
}

// Уточненная абстракция (Refined Abstraction)
class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }
}

// Использование
const vectorRenderer = new VectorRenderer();
const rasterRenderer = new RasterRenderer();

const circle1 = new Circle(vectorRenderer, 5);
const circle2 = new Circle(rasterRenderer, 10);

circle1.draw(); // Drawing a circle of radius 5 using vectors
circle2.draw(); // Drawing a circle of radius 10 using pixels
```
Структура паттерна:
- Абстракция (Abstraction) → Shape (и его уточнение Circle)
  - Определяет интерфейс высокого уровня (draw()), но не реализует низкоуровневые детали.
- Реализация (Implementor) → Renderer (и его конкретные варианты VectorRenderer, RasterRenderer)
  - Предоставляет методы для отрисовки (renderCircle()), но не знает, как их использует Shape.
- Мост (Bridge) → Связь между Shape и Renderer через композицию
  - Shape хранит ссылку на Renderer (this.renderer) и делегирует ему работу.
Где здесь Bridge?
- Circle не наследует напрямую VectorRenderer или RasterRenderer, а использует их через ссылку (this.renderer).
- Если добавить новый тип рендерера (например, WebGLRenderer), Circle не изменится.
- Если добавить новую фигуру (например, Square), рендеры тоже не изменятся.
Вывод:
Мост здесь — это композиция Shape + Renderer, позволяющая им меняться независимо.
