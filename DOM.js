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





