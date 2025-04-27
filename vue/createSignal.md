```js
import { shallowRef, triggerRef } from 'vue';

function createSignal(value, options) {
	const result = shallowRef(value);
	const get = () => result.value;
	const set = (val) => {
		result.value = typeof val === 'function' ? val(result.value) : val;
		if (options.equals === false) triggerRef(result);
	}

	return [get, set];
}
```