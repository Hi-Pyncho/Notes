Generics в TypeScript — это мощный механизм, позволяющий писать переиспользуемый и типобезопасный код, не привязываясь к конкретным типам данных заранее. Они позволяют «параметризовать» функции, классы, интерфейсы и типы, чтобы они могли работать с разными типами, сохраняя при этом информацию о типах во время компиляции.

### Простой пример: функция identity

Без generics:
```ts
function identity(arg: any): any {
  return arg;
}
```
Эта функция принимает любой тип и возвращает его, но теряет информацию о конкретном типе.

С generics:
```ts
function identity<T>(arg: T): T {
  return arg;
}
```
Здесь `T` — это placeholder для типа, который будет определён при вызове функции.

Использование:
```ts
let output = identity<string>("hello"); // output: string
let num = identity(42); // TypeScript выведет тип автоматически → number
```

### Generics в интерфейсах

```ts
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "text" };
const numberBox: Box<number> = { value: 42 };
```

### Generics в классах

```ts
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}

const numberQueue = new Queue<number>();
numberQueue.enqueue(1);
```

### Ограничения (constraints)

Иногда нужно гарантировать, что generic-тип имеет определённые свойства. Для этого используют `extends`:

```ts
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
// logLength(42); // Ошибка: number не имеет length
```

### Generics с несколькими параметрами

```ts
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

const result = pair("hello", 42); // тип: [string, number]
```

### Утилиты TypeScript и generics

Многие встроенные утилиты (`Partial<T>`, `Pick<T, K>`, `Record<K, T>` и др.) активно используют generics:

```ts
type User = { name: string; age: number };
type UserPreview = Pick<User, "name">; // { name: string }
```

### Преимущества generics:
- **Типобезопасность**: компилятор знает точные типы.
- **Гибкость**: один и тот же код работает с разными типами.
- **Читаемость и поддержка**: сигнатуры функций и классов становятся более выразительными.

Если хочешь, могу показать примеры с конкретными сценариями — например, как использовать generics в Node.js или с библиотеками вроде Tedious.
