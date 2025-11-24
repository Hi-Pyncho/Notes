# interfaces

```ts
interface Rect {
  readonly id: string,
  color?: string,
  size: {
    width: number,
    height: number
  }
}
```
```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```
## Расширение интерфейса
```ts
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}
```

## создание на основе других интерфейсов
```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

## Интерфейсы и классы
```ts
interface IClock {
  time: Date;
  setTime(date: Date): void;
}

class Clock implements IClock {
  time: Date = new Date();
  setTime(date: Date): void {
    this.time = date;
  }
}
```

## Если нужно перечислить свойства не зная точно сколько их будет
```ts
interface Styles {
  [key: string]: string;
}

const css: Styles = {
  border: '1px solid black',
  marginTop: '2px',
  borderRadius: '5px'
}
```
