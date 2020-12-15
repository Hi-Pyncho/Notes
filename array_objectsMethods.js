/////Методы для работы с массивами и объектами

// FOR/WHILE/for let item of array/forEach/MAP/FILTER/REDUCE/CHAINING/
// DELETE/SPLICE/SLICE/CONCAT/indexOf/lastIndexOf и includes/FIND/FINDINDEX/
// SORT/REVERSE/SPLIT/JOIN/Array.isArray/SOME/EVERY/FILL/thisArg

const people = [
	{ name: "Bob", age: 43, budget: 2000},
	{ name: "Tom", age: 13, budget: 2230},
  	{ name: "Mick", age: 23, budget: 3400},
  	{ name: "Bob", age: 33, budget: 4000},
	{ name: "Lacy", age: 11, budget: 5600},
	{ name: "Ched", age: 18, budget: 1200},
]

/////////////////////////////////////////////////////

// обычный цикл FOR (ES 5)
for (let i = 0; i < people.length; i++) {
	console.log(people[i].name);
}

/////////////////////////////////////////////////////

// цикл с помощью WHILE
let i = 0;
while(i < people.length) {
	console.log(people[i].name);
	i++;
}

/////////////////////////////////////////////////////

//цикл for let item of array (ES 6)
for(let person of people) {
	console.log(person.name)
}

/////////////////////////////////////////////////////

//цикл forEach
people.forEach(function(item, index, array) {
	console.log(item.name)
})

people.forEach(person => console.log(person.name))

/////////////////////////////////////////////////////

//MAP
let newPeople = people.map(function(item, index, array) {
	return `Hello, ${item.name}`
})

console.log(newPeople)

//один statement return
let newPeople = people.map(person => `${person.name} (${person.age})`)

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6

/////////////////////////////////////////////////////

//FILTER

let results = arr.filter(function(item, index, array) {
  // если true - элемент добавляется к результату, и перебор продолжается
  // возвращается пустой массив в случае, если ничего не найдено
});

const adults = people.filter(person => {
	if(person.age >= 18) {
		return true
	}
})

const adults = people.filter(person => person.age >= 18)

/////////////////////////////////////////////////////

//REDUCE
//есть еще reduceRight - то же самое, но справа налево
//без второго аргумента за основу берется первое значение в массиве
arr.reduce((sum, current) => sum + current);

const amount = people.reduce((total, person) => {
  return total + person.budget
}, 0)

const amount = people.reduce((total, person) => total + person.budget, 0)

const numbers = [12, 43, 33]
const doubles = numbers.reduce((total, num) => {
  total.push(num * 2)
  return total
}, [])



const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
const count = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1 ;
  return tally;
} , {})
// count // { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }

/////////////////////////////////////////////////////

//CHAINING

const newPeople = people
	.filter(person => person.budget >= 2000)
	.map(person => {
		return {
			info: `${person.name} (${person.age})`,
			budget: person.budget
		}
	})

/////////////////////////////////////////////////////

//DELETE

const array = [1, 2, 3, 4];
//удалит только элемент.length останется
delete array[0];

console.log(array);
//[undefined, 2, 3, 4]

/////////////////////////////////////////////////////

//SPLICE
//синтаксис
arr.splice(index[, deleteCount, elem1, ..., elemN])

const array = [1, 2, 3, 4];

array.splice(0, 1);

console.log(array)
//[2, 3, 4]

//===========================

let arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];

// удалить 3 первых элемента и заменить их другими
arr.splice(0, 3, "Давай", "танцевать");

alert( arr ) // теперь ["Давай", "танцевать", "прямо", "сейчас"]

//=============================

let arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];

//Здесь видно, что splice возвращает массив из удалённых элементов:
// удалить 2 первых элемента
let removed = arr.splice(0, 2);

alert( removed ); // "Я", "изучаю" <-- массив из удалённых элементов

//===============================

//Метод splice также может вставлять элементы без удаления, для этого достаточно установить deleteCount в 0:

let arr = ["Я", "изучаю", "JavaScript"];

// с позиции 2
// удалить 0 элементов
// вставить "сложный", "язык"
arr.splice(2, 0, "сложный", "язык");

alert( arr ); // "Я", "изучаю", "сложный", "язык", "JavaScript"

//===========================

//Отрицательные индексы разрешены
let arr = [1, 2, 5];

// начиная с индекса -1 (перед последним элементом)
// удалить 0 элементов,
// затем вставить числа 3 и 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5

//а так можно удалить все, кроме последнего индекса
array.splice(0, array.length - 1);


/////////////////////////////////////////////////////

//SLICE

arr.slice([start], [end])

let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (копирует с 1 до 3)

alert( arr.slice(-2) ); // s,t (копирует с -2 до конца)

let newArr = arr.slice();// копирует массив

/////////////////////////////////////////////////////

//CONCAT
arr.concat(arg1, arg2...)

let arr = [1, 2];

// создать массив из: arr и [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// создать массив из: arr и [3,4] и [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// создать массив из: arr и [3,4], потом добавить значения 5 и 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6

let arr = [1, 2];

let arrayLike = {
  0: "что-то",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]

//Но если объект имеет специальное свойство Symbol.isConcatSpreadable, то он обрабатывается concat как массив: вместо него добавляются его числовые свойства.
//Для корректной обработки в объекте должны быть числовые свойства и length:

let arr = [1, 2];

let arrayLike = {
  0: "что-то",
  1: "ещё",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,что-то,ещё


/////////////////////////////////////////////////////

//indexOf/lastIndexOf и includes
//у них одинаковый синтаксис

//работает с примитивами
// arr.indexOf(item, from) ищет item, начиная с индекса from, и возвращает индекс, на котором был найден искомый элемент, в противном случае -1.
// arr.lastIndexOf(item, from) – то же самое, но ищет справа налево.
// arr.includes(item, from) – ищет item, начиная с индекса from, и возвращает true, если поиск успешен.

let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true


/////////////////////////////////////////////////////

//FIND
//возвр значение ПЕРВОГО найденного эл-та в массиве

let users = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 3, name: "Маша"}
];

let user = users.find(item => item.id == 1);

console.log(user.name); // Вася

//FINDINDEX
//возвращает индекс объекта в массиве
//работает с объектами

let user = users.findIndex(item => item.id == 1);

console.log(user); // 0

/////////////////////////////////////////////////////

//SORT

let arr = [ 1, 2, 15 ];

// метод сортирует содержимое arr
arr.sort();

alert( arr );  // 1, 15, 2

function compare(a, b) {
  if (a > b) return 1; // если первое значение больше второго
  if (a == b) return 0; // если равны
  if (a < b) return -1; // если первое значение меньше второго
}

//это коротко отсортирует по возрастанию
//любое отрицательное или положительное число при сравнении
arr.sort( (a, b) => a - b)

/////////////////////////////////////////////////////

//REVERSE
//меняет порядок элементов в arr на обратный.

let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1

/////////////////////////////////////////////////////

//SPLIT
//разбивает строку на массив по заданному разделителю delim.

let names = 'Вася, Петя, Маша';

let arr = names.split(', ');

for (let name of arr) {
  alert( `Сообщение получат: ${name}.` ); // Сообщение получат: Вася (и другие имена)
}

//разбивка по буквам

let str = "тест";

alert( str.split('') ); // т,е,с,т

/////////////////////////////////////////////////////

//JOIN
//Он создаёт строку из элементов arr, вставляя glue между ними.

let arr = ['Вася', 'Петя', 'Маша'];

let str = arr.join(';'); // объединить массив в строку через ;

alert( str ); // Вася;Петя;Маша

/////////////////////////////////////////////////////

//Array.isArray

// Массивы не образуют отдельный тип языка. Они основаны на объектах.
// Поэтому typeof не может отличить простой объект от массива:

alert(typeof {}); // object
alert(typeof []); // тоже object

//поэтому есть Array.isArray
alert(Array.isArray({})); // false
alert(Array.isArray([])); // true

/////////////////////////////////////////////////////

//SOME
// Функция fn вызывается для каждого элемента массива аналогично map. 
// Если какие-либо/все результаты вызовов являются true, то метод 
// возвращает true, иначе false.

function isBiggerThan10(element, index, array) {
  return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

/////////////////////////////////////////////////////

//EVERY
// проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.

[12, 5, 8, 130, 44].every(elem => elem >= 10);   // false
[12, 54, 18, 130, 44].every(elem => elem >= 10); // true

/////////////////////////////////////////////////////

//FILL
// заполняет все элементы массива от начального до конечного индексов одним значением.
//синтаксис
arr.fill(value[, start = 0[, end = this.length]])

[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]

/////////////////////////////////////////////////////

//thisArg - необяз параметр в ф-циях:

arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg - это необязательный последний аргумент
//Значение параметра thisArg становится this для func.

//НАПРИМЕР
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

// найти пользователей, для которых army.canJoin возвращает true
let soldiers = users.filter(army.canJoin, army);

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23

// Если бы мы в примере выше использовали просто users.filter(army.canJoin), 
// то вызов army.canJoin был бы в режиме отдельной функции, с this=undefined. 
// Это тут же привело бы к ошибке.

// Вызов users.filter(army.canJoin, army) можно заменить на users.filter(user => army.canJoin(user)), 
// который делает то же самое. Последняя запись используется даже чаще, так как функция-стрелка более наглядна.



Шпаргалка по методам массива:

    Для добавления/удаления элементов:
        push (...items) – добавляет элементы в конец,
        pop() – извлекает элемент с конца,
        shift() – извлекает элемент с начала,
        unshift(...items) – добавляет элементы в начало.
        splice(pos, deleteCount, ...items) – начиная с индекса pos, удаляет deleteCount элементов и вставляет items.
        slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end (не включая end).
        concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.

    Для поиска среди элементов:
        indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
        includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
        find/filter(func) – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается true.
        findIndex похож на find, но возвращает индекс вместо значения.

    Для перебора элементов:
        forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.

    Для преобразования массива:
        map(func) – создаёт новый массив из результатов вызова func для каждого элемента.
        sort(func) – сортирует массив «на месте», а потом возвращает его.
        reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
        split/join – преобразует строку в массив и обратно.
        reduce(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.

    Дополнительно:
        Array.isArray(arr) проверяет, является ли arr массивом.

Обратите внимание, что методы sort(), reverse() и splice() изменяют исходный массив.