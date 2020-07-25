//STRINGS METHODS
str.charAt/toLowerCase/toUpperCase/str.indexOf()/str.lastIndexOf/str.includes/str.startsWith/str.endsWith/
str.slice/str.substring/str.substr/replace()/str.split/arr.join/trim()/trimRight()/trimLeft()/String.fromCharCode()/
String.charCodeAt()/match()/search()/test()



------str.charAt()------

let str = `Hello`;

// разница между ними в том что 
// на несуществующий символ возвращают разное
console.log( str[10] ); // undefined
console.log( str.charAt(10) ); // empty string


/////////////////////////////////////////////////////////
-------toLowerCase & toUpperCase--------

alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface


///////////////////////////////////////////////////////
----------str.indexOf()--------

let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, потому что подстрока 'Widget' найдена в начале
alert( str.indexOf('widget') ); // -1, совпадений нет, поиск чувствителен к регистру

alert( str.indexOf("id") ); // 1, подстрока "id" найдена на позиции 1 (..idget with id)

// Чтобы найти все вхождения подстроки, нужно запустить indexOf 
// в цикле. Каждый раз, получив очередную позицию, начинаем 
// новый поиск со следующей:

let str = 'Ослик Иа-Иа посмотрел на виадук';

let target = 'Иа'; // цель поиска

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Найдено тут: ${foundPos}` );
  pos = foundPos + 1; // продолжаем со следующей позиции
}

//Тот же алгоритм можно записать и короче:
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}


////////////////////////////////////////////////////////
----------str.lastIndexOf(substr, position)------------

// ищет с конца строки к её началу.
// Он используется тогда, когда нужно получить самое последнее 
// вхождение: перед концом строки или начинающееся до (включительно) 
// определённой позиции.


////////////////////////////////////////////////////////
-----------str.includes(substr, pos)--------------
//либо contains() - в мозилле
//современный способ, если позиция не нужна, а только
//true или false

alert( "Widget with id".includes("Widget") ); // true


///////////////////////////////////////////////////////
--------str.startsWith и str.endsWith--------------

alert( "Widget".startsWith("Wid") ); // true, "Wid" — начало "Widget"
alert( "Widget".endsWith("get") ); // true, "get" — окончание "Widget"


/////////////////////////////////////////////////////
------------str.slice(start [, end])----------------

// Возвращает часть строки от start до (не включая) end.

let str = "stringify";
// 'strin', символы от 0 до 5 (не включая 5)
alert( str.slice(0, 5) );
// 's', от 0 до 1, не включая 1, т. е. только один символ на позиции 0
alert( str.slice(0, 1) );

// Если аргумент end отсутствует, slice возвращает символы до конца строки:

let str = "stringify";
alert( str.slice(2) ); // ringify, с позиции 2 и до конца

// Также для start/end можно задавать отрицательные значения. 
// Это означает, что позиция определена как заданное количество символов с конца строки:

let str = "stringify";

// начинаем с позиции 4 справа, а заканчиваем на позиции 1 справа
alert( str.slice(-4, -1) ); // gif


////////////////////////////////////////////////////
--------------str.substring(start [, end])----------

// Возвращает часть строки между start и end.
// Это — почти то же, что и slice, но можно задавать start больше end.

let str = "stringify";

// для substring эти два примера — одинаковы
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"

// …но не для slice:
alert( str.slice(2, 6) ); // "ring" (то же самое)
alert( str.slice(6, 2) ); // "" (пустая строка)

// Отрицательные значения substring, в отличие от slice, не поддерживает, они интерпретируются как 0.


//////////////////////////////////////////////////
-----------str.substr(start [, length])-----------

// Возвращает часть строки от start длины length.
// В противоположность предыдущим методам, этот позволяет указать длину вместо конечной позиции:

let str = "stringify";
// ring, получаем 4 символа, начиная с позиции 2
alert( str.substr(2, 4) );

// Значение первого аргумента может быть отрицательным, тогда позиция определяется с конца:

let str = "stringify";
// gi, получаем 2 символа, начиная с позиции 4 с конца строки
alert( str.substr(-4, 2) );


////////////////////////////////////////////////
-------replace ()-------------

// Он принимает два параметра — строку (или регулярное выражение), которую вы хотите заменить, 
// и строку, которую вы хотите вставить вместо заменяемой. 
//чтобы сработало установить значение переменной в результате операции; он не просто обновляет значение подстроки автоматически

let string = 'mozzila';
let newString = string.replace('moz', 'van');
console.log(newString)

const str = 'Меня зовут Igor Sidorov. А тебя?'
const regexp = /(\w+)\s(\w+)/
console.log(str.repalce(regexp, "$&")) 
//=>'Меня зовут Igor Sidorov. А тебя?'
// $& - вставляет все найденное совпадение
console.log(str.repalce(regexp, "$`")) 
//=>'Меня зовут Меня зовут. А тебя?'
// $` - вставляет часть строки до совпадения
console.log(str.repalce(regexp, "$'")) 
//=> Меня зовут . А тебя?. А тебя?
// $' - все, что найдено после совпадения
console.log(str.repalce(regexp, "$2 $1")) 
//=> Меня зовут Sidorov Igor. А тебя?
// $N - обратная ссылка в шаблоне. Где N - номер скобочной группы
// $<name> - обратная ссылка в шаблоне
// можно использовать именованные скобочные группы
const regexp = /(?<first_name>\w+)\s(?<second_name>\w+)/
console.log(str.repalce(regexp, "$<second_name> $<first_name>")) 




/////////////////////////////////////////////
----------str.split([separator[, limit]])------------

//Метод split() возвращает новый массив.

let string = 'mozzila';

let newSting = string.split('');

console.log(newSting)
//["m", "o", "z", "z", "i", "l", "a"]

let str = 'I do not need spaces';
let newStr = str.split(' ');

console.log(newStr);
//["I", "do", "not", "need", "spaces"]

// В следующем примере метод split() ищет 0 или более пробелов в строке и возвращает первые три найденных подстроки.
var myString = 'Привет, мир. Как дела?';
var splits = myString.split(' ', 3);

console.log(splits);
//Привет,мир.,Как


///////////////////////////////////////////////
-----------arr.join([separator])------------

var a = ['Ветер', 'Дождь', 'Огонь'];
var myVar1 = a.join();      
// присвоит 'Ветер,Дождь,Огонь' переменной myVar1
var myVar2 = a.join(', ');  
// присвоит 'Ветер, Дождь, Огонь' переменной myVar2
var myVar3 = a.join(' + '); 
// присвоит 'Ветер + Дождь + Огонь' переменной myVar3
var myVar4 = a.join('');    
// присвоит 'ВетерДождьОгонь' переменной myVar4


////////////////////////////////////////////////////
--------------trim()--------------------
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'

---------------trimRight()-----------

var orig = '   foo  ';
console.log(orig.trimRight()); // '   foo'

--------------trimLeft()------------------

var orig = '   foo  ';
console.log(orig.trimRight()); // 'foo  '


///////////////////////////////////////////////////
------------String.fromCharCode()--------------
// Статический метод String.fromCharCode() возвращает строку, 
// созданную из указанной последовательности значений единиц кода UTF-16.

String.fromCharCode(65, 66, 67);  // "ABC"


///////////////////////////////////////////////////
------------String.charCodeAt()-----------------------
// Метод charCodeAt() возвращает числовое значение Юникода для символа 
// по указанному индексу (за исключением кодовых точек Юникода, больших 0x10000).

'ABC'.charCodeAt(0); // вернёт 65


/////////////////////////////////////////////////
-----------match()--------------
//ищет совпадение регулярного выражения и возвращает массив

let string = 'Hello, my name is Bob';

let regExp = /Bob/;

console.log(string.match(regExp))
["Bob", index: 18, input: "Hello, my name is Bob", groups: undefined]


////////////////////////////////////////////////
--------search()------------
//Метод search() выполняет поиск сопоставления между регулярным выражением и этим объектом String.
//возвращает индекс, если нашел, или -1 если не нашел
str.search([regexp])

const regexp = /\d{6}/;
const string = '... телефон 123454. Его почта ....'
const result = str.search(regexp)
console.log(result) //12

////////////////////////////////////////////////
-------test()------------
RegExp.prototype.test(str)
//Метод regexp.test(str) проверяет, есть ли хоть одно совпадение, если да, то возвращает true, иначе false.

let str = "Я ЛюБлЮ JavaScript";
let regexp = /люблю/i;

alert( regexp.test(str) ); // true