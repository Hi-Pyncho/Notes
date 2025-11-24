## javascript

Хак, чтобы заставить переключить ноут в дискретную видеокарту для большей производительности
```js
try {
  const canvas = document.createElement('canvas')
    .getContext('webgl', { powePreference: 'hight-perfomance' });
} catch(e) {}
```
---

выделять сдвиг элементов в слои через `will-change`, но не забывать убирать, если дальше элемент будет статичным

---

[npm-check](https://www.npmjs.com/package/npm-check)

---

[local node version](https://www.npmjs.com/package/node)

Опция `-p` для npx позволяет вам указывать пакеты для установки и добавления в запущенный $PATH, поэтому это означает, что вы можете делать такие забавные вещи, как: $ `npx -p node-bin@6 npm it`, чтобы установить и протестировать npm пакет, как если бы вы запускали node@6 глобально.

---

также можно с помощью `npx` запускать гисты с хитхаба, [вот пример](https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32)


-----------------------------------------------
totally hide properties

```js
const s = Symbol('value')
class Ex {
  constructor(value) {
    Object.defineProperties(this, s, { configurable: false, enumerable: false, writeble: false, value })
  }

  getValue() {
    return this[s]
  }
}
```
аттрибут `inert` для блокировки фокуса (=[pointer-events:none, no-focus, aria-hidden, tabindex=-1])

[worklets](https://developer.mozilla.org/en-US/docs/Web/API/Worklet)
Ворклеты это хуки внутри rendering pipeline браузера, позволяющий нам иметь низкоуровневый доступ к процессу рендеринга браузера, таким как вычисление стилей и расчет макета.

CSS
[@counter-style](https://hcdev.ru/css/counter-style/) - для определения стилей счетчиков
[@fullscreen](https://hcdev.ru/css/fullscreen/#_4)
[:target](https://hcdev.ru/css/target/)
`scrollbar-gutter`

visibilitychange naviganor.sendBeacon
