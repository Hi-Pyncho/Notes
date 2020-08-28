// СОЗДАНИЕ, КЛОНИРОВАНИЕ, УДАЛЕНИЕ
//создает ноду с типом ЭЛЕМЕНТ
document.createElement(tag)
// создает ноду с типом ТЕКСТ
document.createTextNode(text)
// клонирование
elem.cloneNode(true) - глубокое
elem.cloneNode(false) - только elem
// удаление
node.remove()



// ВСТАВКА
// – добавляет узлы или строки в конец node,
node.append(...nodes or strings) 
// – вставляет узлы или строки в начало node,
node.prepend(...nodes or strings) 
// –- вставляет узлы или строки до node,
node.before(...nodes or strings) 
// –- вставляет узлы или строки после node,
node.after(...nodes or strings) 
// –- заменяет node заданными узлами или строками.
node.replaceWith(...nodes or strings) 

// Все методы вставки автоматически удаляют узлы со старых мест.
<div id="first">Первый</div>
<div id="second">Второй</div>
// нет необходимости вызывать метод remove
second.after(first); // берёт #second и после него вставляет #first

// УСТАРЕВШИЕ МЕТОДЫ
parent.appendChild(node)
parent.insertBefore(node, nextSibling)
parent.removeChild(node)
parent.replaceChild(newElem, node)



// Если нужно вставить HTML именно «как html», 
// со всеми тегами и прочим, как делает это elem.innerHTML
elem.insertAdjacentHTML(where, html)
	"beforebegin" – вставить html непосредственно перед elem,
	"afterbegin" – вставить html в начало elem,
	"beforeend" – вставить html в конец elem,
	"afterend" – вставить html непосредственно после elem.
// Например
div.insertAdjacentHTML('beforebegin', '<p>Привет</p>');



//СТИЛИ
//перезаписывает все стили!
style.cssText = '';
//например
div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;
//то же самое можно сделать с помощью elem.setAttribute('style', 'color:red...')

//если нужно прочитать свойства, чтобы добавить к ним свои вычисления
getComputedStyle(element, [pseudo])
// ELEMENT - Элемент, значения для которого нужно получить
// PSEUDO - Указывается, если нужен стиль псевдоэлемента, 
// например ::before. Пустая строка или отсутствие аргумента означают сам элемент. 
//например
let computedStyle = getComputedStyle(document.body);

// сейчас мы можем прочитать отступ и цвет

alert( computedStyle.marginTop ); // 5px
alert( computedStyle.color ); // rgb(255, 0, 0)


//CURRENTTARGET, TARGET, ВСПЛЫТИЕ И ПОГРУЖЕНИЕ
event.target // ссылка на элемент, с которым взаимод-ли
event.currentTarget // контекст(=this) события
//чтобы остановить всплатие и задействие других обработчиков что выше
event.stopPropagation()
//полностью остановить обработку событий даже на самом элементе
event.stopImmediatePropagation()

// Стандарт DOM Events описывает 3 фазы прохода события:

//     Фаза погружения (capturing phase) – событие сначала идёт сверху вниз.
//     Фаза цели (target phase) – событие достигло целевого(исходного) элемента.
//     Фаза всплытия (bubbling stage) – событие начинает всплывать.
//перехватывать события погружения и всплытия
for(let elem of document.querySelectorAll('*')) {
  elem.addEventListener("click", e => alert(`Погружение: ${elem.tagName}`), true);
  elem.addEventListener("click", e => alert(`Всплытие: ${elem.tagName}`));
}

// При наступлении события – самый глубоко вложенный элемент, на котором оно произошло, помечается как «целевой» (event.target).

//     Затем событие сначала двигается вниз от корня документа к event.target, по пути вызывая обработчики, поставленные через addEventListener(...., true), где true – это сокращение для {capture: true}.
//     Далее обработчики вызываются на целевом элементе.
//     Далее событие двигается от event.target вверх к корню документа, по пути вызывая обработчики, поставленные через on<event> и addEventListener без третьего аргумента или с третьим аргументом равным false.

// Каждый обработчик имеет доступ к свойствам события event:

//     event.target – самый глубокий элемент, на котором произошло событие.
//     event.currentTarget (=this) – элемент, на котором в данный момент сработал обработчик (тот, на котором «висит» конкретный обработчик)
//     event.eventPhase – на какой фазе он сработал (погружение=1, фаза цели=2, всплытие=3).
