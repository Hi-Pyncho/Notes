# Способы стилизовать компонент

## Свойство [adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets)

Создаем stylesheet с помощью [CSSStyleSheet() constructor](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet)

```js
const sheet = new CSSStyleSheet();
sheet.replaceSync("a { color: red; }");

// добавляем в массив adoptedStyleSheets
const node = document.createElement("div");
const shadow = node.attachShadow({ mode: "open" });
shadow.adoptedStyleSheets = [sheet];

// можно менять стили уже после добавления в shadow root
sheet.insertRule("* { background-color: blue; }");
```

### Пример с добавлением через атрибут
Посмотреть поддержку `import assert` можно [тут](https://caniuse.com/mdn-javascript_statements_import_import_assertions). На данный момент не поддерживается Firefox
```html
<my-element custom-style-path="./custom-style.css"></my-element>
```
```js
import myElStyles from './my-element.css' assert { type: 'css' };

class MyElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.addStyles();
  }

  async addStyles() {
    this.shadowRoot.adoptedStyleSheets = [myElStyles];

    const customStylesPath = this.getAttribute('custom-style-path');

    if(!customStylesPath) return;

    const customStyles = await import(customStylesPath, { assert: { type: 'css' } } );
    this.shadowRoot.adoptedStyleSheets.push(customStyles.default);
  }
}
```

### Пример с добавлением стилей в конструктор
```js
// В компоненте добавляем через конструктор стили и добавляем к своим стилям
import myElementStyles from './my-element.css' assert { type: 'css' };

class MyElement extends HTMLElement {
  constructor(stylesheet = null) {
    super();

    this.attachShadow({mode: 'open'});

    if(stylesheet) {
      this.shadowRoot.adoptedStyleSheets = [myElementStyles, stylesheet];
    }
  }
}

// При использовании компонента:
import sheet from './custom.css' assert { type: 'css' };

customElements.define('my-element', MyElement);

const myElementInstance = new MyElement(sheet);
document.body.append(myElementInstance);
```

## CSS переменные
Могут проникать внутрь shodow dom. Поэтому если объявить в внутри shadow dom компонента, то снаружи компонента в light dom можно задать этим переменным нужные значения.

```css
/* внутри shadow dom компонента my-element */
:host {
  background-color: var(--bg-color, #000);
}

/* снаружи в css light dom */
my-element {
  --bg-color: '#fff';
}
```

## :part(selector) аттрибут
Внутри компонента `my-element`
```html
<button part='click'>Click</button>
```

Снаружи компонента `my-element`
```css
my-element::part(click) {
  color: red;
}
```

## :host-context(selector)
С помощью этого аттрибута можно достучаться из веб компонента наружу в light dom и стилизовать его
```css
/* внутри компонента my element */
:host-context(.wrapper) {
  background-color: gray;
}
```

## ::slotted(selector)
Дает возможность добраться до элемента и стилизовать его, если он является прямым потомком элемента. Если элемент расположен глубже, он стилизован не будет.

Внутри стилей компонента `my-element`
```css
::slotted(.purple-text) {
  color: purple;
}
```

```html
<my-element>
  <span class="purple-text">Purple</span>
  <p>
     <span class="purple-text">Not purple</span>
  </p>
</my-element>
```

## :defined
Позволяет из light dom определить стили компонента до того, как он рарегистрировался и отрендерился и после этого.

```css
/* так можно скрыть все кастомные компоненты, пока они не готовы отрисоваться */
:not(:definted) {
  opacity: 0;
}
```
