![[files/Pasted image 20240721104313.png]]
https://refactoring.guru/ru/design-patterns/flyweight

https://github.com/HowProgrammingWorks/Flyweight/tree/master/JavaScript

```js
// x, y - внешнее состояние, изменчивое
// radius, color - внутреннее состояние, неизменчивое
class Ball {
  constructor(x, y, innerState) {
    this.x = x;
    this.y = y;
    this.innerState = innerState;
  }
}

class Flyweight {
  constructor(radius, color) {
    this.radius = radius;
    this.color = color;
  }
}

class FlyweightFactory {
  constructor() {
    this._flyweights = new Map();
  }

  create(radius, color) {
    const key = `${radius}:${color}`;
    if (this._flyweights.has(key)) {
      return this._flyweights.get(key);
    }

    const flyweight = new Flyweight(radius, color);
    this._flyweights.set(key, flyweight);
    return flyweight;
  }
}

const factory = new FlyweightFactory();

const ball1 = new Ball(0, 0, factory.create(10, "red"));
const ball2 = new Ball(0, 0, factory.create(10, "red"));
const ball3 = new Ball(0, 0, factory.create(10, "green"));

console.log(ball1.innerState === ball2.innerState); // true
```