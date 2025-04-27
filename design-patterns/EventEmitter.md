[event target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget)
[custom event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)

```js
eyeson.onEvent(event => {  
window.dispatchEvent(new CustomEvent('eyeson', { detail: event }));  
window.dispatchEvent(new CustomEvent('eyeson.' + event.type, { detail: event }));  
});  
eyeson.start(token);  
/* then listen for events */  
window.addEventListener('eyeson', handleEvent);  
window.addEventListener('eyeson.chat', handleIncomingChatMessage);
```