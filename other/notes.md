- [html](#html)
- [css](#css)
- [javascript](#javascript)
- [vue](#vue)

## html


## css


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

## vue

stable props prevent rerendering

websockets http requets to switch protocols socket.io for broadcast pusher library

readonly(reactive, refs) toRefs

ref({}).value === reactive({}) both proxy ref uses reactive for objects under the hood

readonly(reactive({})) set val from function store without vuex and pinia (export/import === provide/inject)

v-once for static render v-memo=[deps] for subtree memoizing

defineAsyncComponent + suspense to lazy load on the right moment

css variables v-bind `.text { color: v-bind(color), font-weight: v-bind('font.weight') }`

npx serve .

choco install mkcert ||| mkcert -install && mkcert localhost && local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem

одержимость элементарными типами (primitive obsession) id: number (UniqueId: number -> id: UniqueId)

checkbox v-model='toggle' true-value='yes' false-value='no'

watch watchEffect watchPostEffect - flush: 'post' - give access to DOM after update. usually it triggers before component updates

const vFocus => v-focus

<KeepAlive><component is=''>

web components | :host([disabled]) :host(.pink) (если у хоста disabled или класс .pink)
web components | :host-context(.dark-theme) (если любой предок содержит класс .dark-theme)

patterns: provider,prototype,container-presentation,observer,mediator

RPC(Remote Procedure Call) удаленный вызов процедур(squareSum|num:4) JSON-RPC {"jsonrpc": "2.0", "method": "square_sum", "params": [4], "id": 1}

WebRTC (audio-video btw browsers)

node.js console.dir { depth } option default:2 if-need-infinity=>{ depth: null }

node.js sandboxes чтобы контексты не пересекались

архитектура:декомпозиция-связывание-наименование
связывание через:данные/интерфейсы/события

transaction object database start difference rollback proxy clone commit

-----------------------------------------------
totally hide properties
const s = Symbol('value')
class Ex {
  constructor(value) {
    Object.defineProperties(this, s, { configurable: false, enumerable: false, writeble: false, value })
  }

  getValue() {
    return this[s]
  }
}
----------------------------------------------

npm ci (clean install):package-lock.json
npm install:package.json

CoR (цепочка обязанностей)

--------------------------
```css
input:auto-fill
:empty (empty or comment)
:blank (:empty + whitespaces)
background-attachment
::file-selector-button
mask
:target
```
--------------------------

JSON.parse('"string"') -> 'string'

CQS(сommand-query separation) read or write
CQRS - два хранилища. read(more) and write(less) api

pattern Command (.execute()) - object width functions/data
reciever(target)
invoker

--------------------------

github
good first issue / todo / language:javascript /

```diff
- old line
+ new line
```

----------------------------

metaprogramming
function = metadata(declarative config) + metaprogram
интроспекция - возможность запросить тип и структуру объекта во время выполнения программы
рефлекция - способность изучать и модифицировать свою структуру и поведение во время выполнения
// Без рефлексии
new Foo().hello()
// С рефлексией
new (eval('Foo'))()['hello']()

абстрактные классы через throw Error('not emplemented')

pattern Strategy: всегда одинаковый вход(контракт) и почти одинаковый выход(тип результата)

модель акторов. отдельная вычислительная сущность. общение через сообщения. независимость, нет общего store. параллельное программирование

node inspect index.mjs

gzip данных перед отправкой клиенту 'Content-encoding: gzip'

межпроцессорное взаимодействие
- внутренняя почта
- sockets tcp/udp (ip,host)
- файловые потоки stdin, stdout (child_processes)
- общий файл
- базы данных
- кластеры (между процессами)

v-model vue 2
- всего 1 (value)
- событие onInput
- из дочернего this.$emit('input', newValue)

---
глубокое отслеживание
```js
data() {
  user: {
    address: {
      street: '' // watch this
    }
  }
},
watch: {
  handler(value) {
    // ...
  },
  deep: true,
}
```
либо так
```js
 watch: {
    'user.address.street': function(val) {
      console.log(val)
    }
  }
```

v-if v-else + :key='someKey'

`SHIFT+ESC` => processes manager in chrome

динамический импорт `await import('./path')`
можно использовать не прописывая `type="module"`

Intl работа со строками, числами и датами

window.open() для работы с окнами

макрозадача (settimeout, script, mouseover...)
микрозадачи (все, что есть) (промисы и microtasksqueue)
задачи рендера (если есть)

[окна на поддоменах второго уровня](https://learn.javascript.ru/cross-window-communication#okna-na-poddomenah-document-domain)

общение между окнами с разными источниками [postmessage](https://learn.javascript.ru/cross-window-communication#postmessage)

fetch
`response.body.getReader()` - [ReadableStream](https://learn.javascript.ru/fetch-progress)

[AbortController](https://learn.javascript.ru/fetch-abort) для отмены ассинхронных задач

аттрибут `inert` для блокировки фокуса (=[pointer-events:none, no-focus, aria-hidden, tabindex=-1])

declarative shadow dom (не поддерживает только firefox, но есть [полифил](https://developer.chrome.com/articles/declarative-shadow-dom/))

Import assertions (не поддерживаются только firefox)

[adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets)

[worklets](https://developer.mozilla.org/en-US/docs/Web/API/Worklet)
Ворклеты это хуки внутри rendering pipeline браузера, позволяющий нам иметь низкоуровневый доступ к процессу рендеринга браузера, таким как вычисление стилей и расчет макета.

CSS
[@counter-style](https://hcdev.ru/css/counter-style/) - для определения стилей счетчиков
[@fullscreen](https://hcdev.ru/css/fullscreen/#_4)
[:target](https://hcdev.ru/css/target/)
`scrollbar-gutter`

visibilitychange naviganor.sendBeacon
