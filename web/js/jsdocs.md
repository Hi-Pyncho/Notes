
# JSDoc заметки

## Как включить проверку типов в VS Code
1) Добавить `// @ts-check` в начале файла. Таким образом проверка типов будет только на уровне файла.
```js
// @ts-check

// ...code
```

2) Добавить файл `jsconfig.json` или `tsconfig.json` в проект. В файле прописать объект. Таким образом проверка будет на уровне проекта.
```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

3) Добавить в настройки vsCode файла `settings.json` строчку. Таким образом проверка будет во всех файлах, открытых в vsCode.
```json
{
  "js/ts.implicitProjectConfig.checkJs": true
}
```

## Вынести в отдельный файл
Можно использовать синтаксис и силу typescript для описания типов и интерфейсов в файлах `.d.ts`.
```ts
// файл Point.d.ts
export interface Point {
  x: string,
  y: string,
};

// файл index.js
/**
 * @typedef {import('./types').Point} PointDef
 */

/**
 * @type {PointDef}
 */
const point = {
  x: '12',
  y: '2',
};
```

Либо вынести описания типов __JSDoc__ в файл `.js`
```js
// файл types.js
/**
 * @typedef {Object} Point
 * @property {string} x
 * @property {string} y
 */

// файл index.js
// импортировать как файл
import './types.js';

// либо определить тип через импорт
/**
 * @typedef {import('./types.js')).Point} Point
 */

/**
 * @type {Point}
 */
const point = {
  x: '12',
  y: '2',
};

```

## Ключевые слова
```js
/**
 * @private - приватное свойство
 * @readonly - свойство для чтения
 * @protected - защищенное свойство
 * @public - публичное свойство
 * @deprecated - запрещенное свойство
 *
 * @throws {FooException} - функция выбрасывает ошибку
 * @see - указание на дополнительный источник информации
 * {@link {Type}} - указание ссылки на тип
 * @example - описание примера использования
 * @description - описание
 * @override - обозначение, что перетирается метод из базового класса
 *
 * @property - указание свойства объекта
 * @type - указание типа переменной
 * @param - указание параметра функции
 * @callback - указание функции callback
 * @returns - объявление возвращаемого значения
 *
 * @async - асинхронная функция
 * @function - объявление типа функции
 * @class - объявление типа класса
 */
```

## Объявление типов
### Примитивы
```js
/** @type {string} */
const str = 'string';

/** @type {number} */
const num = 123;

/** @type {boolean} */
const bool = true;

/** @type {null} */
const nul = null;

/** @type {undefined} */
const und = undefined;

/** @type {symbol} */
const sym = Symbol('foo');

/** @type {*} */
const jsDocAny = 'any value';

/** @type {any} */
const tsAny = 'any value';
```

### Виды параметров
```js
/**
 * @param {string=} n Опционально
 * @param {string} [n] Опционально
 * @param {(string|number)} n Несколько типов
 * @param {*} n Любой тип
 * @param {...string} n Повторяемые аргументы
 * @param {string} [n="hi"] Опционально со значением по умолчанию
 * @param {string[]} n Массив со строками
 */
```

### Объекты
```js
/**
 * @typedef {object} Rgb
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/** @type {Rgb} */
const color = { red: 255, green: 255, blue: 255 };
```

Сокращенная запись в стиле Typescript
```js
/**
 * @typedef {{title: string, artist: string, year: number}} Song
 */

/**
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```

### Вложенные объекты
Для описания объекта
```js
{
  name: 'Bob',
  address: {
    street: 'Cat street'
  }
}
```
```js
// Через @typedef
/**
 * @typedef {Object} Address
 * @property {string} street
 */

/**
 * @param {Object} options
 * @param {string} options.name
 * @param {Address} options.address
 */
function setUser(options) {
  console.log(options);
}

// Без @typedef (так в VS Code лучше отображаются типы)
/**
 * @param {Object} options
 * @param {string} options.name
 * @param {Object} options.address
 * @param {string} options.address.street
 */
function setUser(options) {
  console.log(options);
}
```

### Массивы
```js
/**
 * @typedef {object} Rgb
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/**
 * @type {Array.<Rgb>}
 */
const colors = [{ red: 0, green: 0, blue: 0 }];

```

### Функции
```js
// Для стрелочной функции
/**
 * @callback Add
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */

/** @type {Add} */
const add = (x, y) => x + y;

// Для обычной функции
/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function addDec(x, y) {
  return x + y;
}
```

### С оператором Rest
```js
/**
 * @param {...number} num
 * @returns {number}
 */
function sum(...num) {
  return num.reduce((s, v) => s + v, 0);
}
```

### Возвращение из функции
```js
/**
 * Если функция ничего не возвращает
 * @returns {void}
 */
function noReturn() {
  console.log('no explicit return');
}

/**
 * Функция никогда ничего не вернет
 * @returns {never}
 */
function neverReturn() {
  throw Error('ERRORRRRR');
}

/**
 * Функция возвращает промис с массивом строк
 * @async
 * @returns {Promise<string[]>}
 */
function neverReturn() {
  throw Error('ERRORRRRR');
}
```

### Типы в классах
```js
class Computer {
  /**
   * @readonly свойство только для чтения
   * @type {string}
   */
  CPU;

  /**
   * @private приватное свойство
   */
  _clock = 3.999;

  /**
   * @param {string} cpu
   * @param {number} clock
   */
  constructor(cpu, clock) {
    this.CPU = cpu;
    this._clock = clock;
  }

  /**
   * @param {string} cpu
   * @returns {void}
   */
  change(cpu) {
    this.CPU = cpu; // нельзя переназначить readonly
  }
}

/**
 * Класс может использоваться и как класс, и как тип
 * @type {Computer}
 */
const computer = new Computer('Foo', 2.999);
```

### Перечисляемые свойства
```js
/**
 * Обозначить строковые значения
 * @typedef {'RED'|'GREEN'|'BLUE'} RgbLabel
 */

/** @type {RgbLabel} */
const label = 'BLUE';

/**
 * Документирует набор статических свойств, значения которых относятся к одному типу
 * @enum {number}
 */
const Status = {
  on: 1,
  off: 0,
  /** @type {boolean} */
  unknown: true,
};

/** @type {Status} */
const off = Status.on;
```

### Union типы
```js
/**
 * @typedef {Date | string | number} MixDate
 */

/**
 * @param {MixDate} date
 * @returns {void}
 */
function showDate(date) {
  // date is Date
  if (date instanceof Date) date;
  // date is string
  else if (typeof date === 'string') date;
  // date is number
  else date;
}
```

## Источники
- [Официальная документация](https://jsdoc.app/)
- [Type safety in JavaScript with JSDoc and VSCode](https://dev.to/t7yang/type-safety-in-javascript-with-jsdoc-and-vscode-1a28)
- [How to use JsDoc annotations with VsCode for intellisense](https://dev.to/sumansarkar/how-to-use-jsdoc-annotations-with-vscode-for-intellisense-7co)
- [JSDoc cheatsheet](https://devhints.io/jsdoc)
- [JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

## Полезные инструменты
- [JSON to JSDocs](https://transform.tools/json-to-jsdoc)
- [VS Code: JSON to JSDocs](https://marketplace.visualstudio.com/items?itemName=scolo.json-to-jsdoc)
- [VS Code: JSON to TS](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts)
- [VS Code: JSDoc Markdown highlighting](https://marketplace.visualstudio.com/items?itemName=bierner.jsdoc-markdown-highlighting)