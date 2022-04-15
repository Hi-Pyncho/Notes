`element.matches('tag#id.class[href=""]')` - вернет __true__ или __false__, если соответствует. Более гибкий способ, в отличие от `element.classList.contains(className)`.  

В devtools можно выбрать элемент из дерева, а в консоли к нему обратиться через `$0`.  

Также в консоли можно искать вот так `$('.row')`. Но это не jQuery.  

---
## Работа с FormData  
```javascript
formData.get('email')
[...formData.values()]
[...formData.entries()]
Object.fromEntries(formData)
```

---
## Обращение к полям формы  
```javascript
const form = document.querySelector(/* селектор до формы */);
form.elements.email // <input name="email" ...
form.elements.password // <input name="password" ...

// Обработка
form.elements.email.addEventListener('change', () => {
  // Обработка
});
```
---
Для экранирования данных из формы и в `innerHTML` есть библиотека [ecsape-goat](https://github.com/sindresorhus/escape-goat)

---
По умолчанию обработчики работают по всплытию 
Если `addEventListener` третьим параметром поставить `true`, то будет работать на погружение 
```javascript
	<div>
		<button>Send</button>
	</div>	

	<script>
		document.querySelector('button').addEventListener('click', () => alert('Boom 1!'));
		document.querySelector('div').addEventListener('click', () => alert('Boom 2!'));
    // => (Boom 1, Boom 2)
		document.querySelector('button').addEventListener('click', () => alert('Boom 1!'));
		document.querySelector('div').addEventListener('click', () => alert('Boom 2!'));
    // => (Boom 2, Boom 1)
	</script>
```
---

```javascript
const url = new URL(path, window.location.origin);
let fragment = new DocumentFragment();
```




<!-- // @ts-check
/* eslint-disable no-param-reassign */

// BEGIN (write your solution here) (write your solution here)
export default () => {
  const state = {
    fields: {
      name: {
        initialValue: 'name',
        currentValue: 'name'
        
      },
      email: {
        initialValue: 'email',
        currentValue: 'email'
      }
    }
  }

  const editableFields = document.querySelectorAll('div[data-editable-target]')

  editableFields.forEach((field) => {
    field.addEventListener('click', () => {
      const fieldName = field.dataset.editableTarget
      field.innerHTML = ''
      field.append(createForm(fieldName, state.fields[fieldName].currentValue, state))
    })
  })
}

function createForm(name, value, state) {
  const form = document.createElement('form')
  const nameInput = document.createElement('input')
  const submitInput = document.createElement('input')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    let nameInput = form.elements[0]
    let name = nameInput.name
    let value = nameInput.value

    state.fields[name].currentValue = value
    if (value === '') {
      state.fields[name].currentValue = state.fields[name].initialValue
    }
    console.log(state)
  })

  nameInput.name = name
  nameInput.type = 'text'
  nameInput.value = value

  submitInput.type = 'submit'
  submitInput.name = 'Save'

  form.append(nameInput, submitInput)

  return form
}
// END -->


