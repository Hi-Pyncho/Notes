v-once, v-memo

[shalowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref) 
[triggerRef](https://vuejs.org/api/reactivity-advanced.html#triggerref)

props stability

dinamically loaded components and scripts when it will needed (defineAsyncComponent, import('./someScript.js'))

[reactivity-debugging](https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging)

[template-explorer](https://template-explorer.vuejs.org/)

[app.config.perfomance](https://vuejs.org/api/application.html#app-config-performance)

[effect-scopes and sharableComposable](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)

Избегайте утечек через provide/inject
```js
// ❌ Опасно: передаём большой объект вглубь дерева
provide('bigData', bigReactiveObject);

// ✅ Лучше: передавайте только методы или ссылки
provide('dataService', {
  getData: () => bigData.value,
  update: updateData
});
```
