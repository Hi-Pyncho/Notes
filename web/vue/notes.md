можно следить за реактивными значениями, переданными родителю ребенком через defineExpose()

toRef - если нужно сохранить реактивную связь, например, с пропсами

unref - полезно, если хз, приходит обычное значение, либо ref с .value. например во внешних функциях или апи

[customRef](https://vuejs.org/api/reactivity-advanced.html#customref)

nextTick - после обновления конкретного реактивного значения
onUpdate - после обновления батча реактивных свойств и детей компонента

onActivated, onDeactivated - хуки, если компонент находится внутри `<KeepAlive>`

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
