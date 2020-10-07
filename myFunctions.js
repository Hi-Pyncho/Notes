// переводит любой текст с цифрами и буквами только в цифры

let str = "this234tnumeri2110, 34 is nut";

function parseToInteger(str) {
  if(!str) return str;
  if(typeof str !== 'string') return 'Enter the string';

  let newStr = [];

  for(let i of str) {
    if(Number.isInteger(+i) && i !== " ") {
      newStr.push(i);
      }
  }
  
  return newStr.join('');
}

console.log(parseToInteger(str));
//234211034

///////////////////////////////////////////////////
// генерирует числа 

const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

/////////////////////////////////////////////////////
//получает разрешение файла

let filename = 'picture.jpg';

function getFileExtension(filename) {
  if(!filename) return filename;
  if(typeof filename !== 'string') return filename;

  let dot = filename.lastIndexOf('.');

  return filename.slice(dot + 1);
}

console.log(getFileExtension(filename))


//////////////////////////////////////////////////
//Заменяет каждую букву следующей буквой по алфавиту

function moveCharsForward(str) {
  return str
  .split('')
  .map(char => String.fromCharCode(char.charCodeAt(0) + 1))
  .join('');
}

console.log(moveCharsForward('abc'))
// bcd


///////////////////////////////////////////////
// форматирует дату в нужный формат

function formatDate(date = new Date()) {
  let days = date.getDate();
  let months = date.getMonth() + 1;
  let years = date.getFullYear();

  return `${days}/${months}/${years}`;
}

console.log(formatDate())


//////////////////////////////////////////////

//здесь знакомимся с установкой параметров
// по умолчанию. то, что у стрелочной функции
// нет собственного контекста

const person = {
  name,
  tails: 1,
  power: 10,
  sleepHours: 12
}

let logger = {
  withParams(top = false, middle = false, bottom = false) {
    if(top) {
      console.log('-------start------');
    }

    Object.keys(this).forEach((key, index, array) => {

      console.log(`${key} : ${this[key]}`);
      //здесь обращаемся к array.length, а не к this.length
      if(middle && index !== array.length - 1) {
        console.log('--------------------');
      }
    })

    if(bottom) {
      console.log('----------end-----------');
    } 
  }
}

logger.withParams.call(person, true, true, true)

/////////////////////////////////////////////////
//функция для создания массива из рандомных чисел

function getRandomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomNumbers(min, max, amount) {
  let array = [];
  for(let i = 0; i < amount; i++) {
    array.push(getRandomNumbers(min, max));
  }
  
  return array;
}

console.log(createRandomNumbers(0, 100, 10))

/////////////////////////////////////////////////
//функция для проверки, отсортирован ли массив чисел

//1-способ
function isSorted(array) {
  let sortedArray = array.slice(0).sort((a,b) => a - b);
  console.log(sortedArray)
  return array.every((n, i) => sortedArray[i] === n);
}

console.log(isSorted(array))

//2-й способ
function isAsceding(array) {
  for(let i = 0; i < array.length; i++) {
    if(array[i + 1] < array[i]) return false;
  }
  return true;
}

console.log(isAsceding(array2))


/////////////////////////////////////////
//найти наибольшее четное число в массиве

function getLargestEven(array) {
  return Math.max(...(array.filter(el => el % 2 === 0)));
}


////////////////////////////////////////
//найти, високосный ли год

function isLeapYear(year) {
  const isYear = new Date(year, 1, 29);
  return isYear.getMonth() > 1 ? false : true;
}

console.log(isLeapYear(1996))

const isLeapYear2 = (year) => year % 4 === 0;


/////////////////////////////////////////////
//проверить, совпадают ли свойства объектов

//1-way
function compareObjects(obj1, obj2) {
  return Object.keys(obj1).every((key) => obj2[key])
}

console.log(compareObjects(object, object3))
//2-way
console.log(JSON.stringify(Object.keys(object)) === JSON.stringify(Object.keys(object3)))


////////////////////////////////////////////
//превратить строку с двухмерный массив (comma-separated values(CSV))

let string = `adf, fadf, fdsa
asdf, fdgdf, fdad
fgfd, fdfwe, ewrwq`

//1-way
function twoDimensionalArray(string) {
  let array = string.split('\n');
  let newArray = [];
  for(let el of array) {
    newArray.push(el.split(','))
  }
  return newArray;
}

//2-way
function twoDimensionalArray2(string) {
  return string.split('\n').map(row => row.split(','))
}

////////////////////////////
//удаляет пробелы и парсит цифры

let string = '1,   2 ,3 ,    4 ,   5'
let regExp = /\s*,\s*/;
let newAr = string.split(regExp)
console.log(newAr) //["1", "2", "3", "4", "5"]


///////////////////////////
//так можно запарсить все цифры

let string = '1jj3j4j3k5j6'

console.log(typeof +string.match(/\d/g).join(''))
//134356


////////////////////////////////
//посчитать количество гласных
//1-way
function countVowels(string) {
  let vowels = 'аеёиоуыэюя';
  return string
  .toLowecCase()
  .split('')
  .reduce((total, current) => vowels.includes(current) ? total += current : total, '')
  .length;
  
}

//2-way
function countVowels(string, letters = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"]) {
  return string
  .toLowerCase()
  .split('')
  .filter((s) => letters.indexOf(s) > -1)
  .length;
}

let string = 'Кот терракотового цвета ел невкусную котлету'
console.log(countVowels(string))


////////////////////////////////////////////////////
//посчитать сколько монет нужно чтобы получить нужную сумму

function countCoins(money, coins = [25, 10, 5, 2, 1]) {
  let amountCoints = [];
  for(let i = 0; i < coins.length; i++) {
    let currentCoin = Math.floor(money / coins[i]);
    for(let j = 0; j < currentCoin; j++) {
      amountCoints.push(coins[i]);
    }
    money -= coins[i] * currentCoin;
  }

  return amountCoints;
}

console.log(countCoins(56))
// [25, 25, 5, 1]

//////////////////////////////////////////////////////
//достать из строки уникальные буквы

let string = 'avadakedavra'

//first way
function extractUniqueChar(string) {
  return [... new Set(string.split(''))];
}

//second way
function extractUniqueChar2(string) {
  let chars = [];
  for(let char of string) {
    if(chars.indexOf(char) === -1) {
      chars.push(char);
    }
  }
  return chars;
}

console.log(extractUniqueChar(string))
console.log(extractUniqueChar2(string))
//["a", "v", "d", "k", "e", "r"]


////////////////////////////////////////////////
//найти первую уникальную букву

let string = 'avadakedavra'

function findFirstUniqueChar(string) {
  let uniqueChars = [...new Set(string)]
  return uniqueChars.filter((char) => string.indexOf(char) === string.lastIndexOf(char))[0];
}

console.log(findFirstUniqueChar(string))
// k


//////////////////////////////////////////////////////////////
//найти всех старше определенного возраста
//посмотри что можно скармливать new Date()
const people = [
  { firstName: 'Sam', lastName: 'Hughes', DOB: '07/07/1978', department: 'Development', salary: '45000' }];

console.log(people.filter(person => new Date().getFullYear() - new Date(person.DOB).getFullYear() > 30).map(person => person.firstName));

//отсортировать по возрасту
console.log(people.sort((personA, personB) => new Date(personA.DOB).getFullYear() - new Date(personB.DOB).getFullYear()))


//////////////////////////////////////////////////////////////
//посчитать сколько в каждом департаменте
const countDepMembers = people.reduce((accumulator, person) => ({ ...accumulator, [person.department]: accumulator[person.department] + 1 || 1}), {});

console.log(countDepMembers)
//{Development: 6, Marketing: 2, Sales: 3, Office Management: 1}

//также можно вывести массив всех уникальных названий департаментов
let departments = [... new Set(people.map(person => person.department))];


/////////////////////////////////////////////////////////////
//Разворачивание массива массивов
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
});
const merged = arr.reduce((prev, item) => [...prev, ...item])
// flattened равен [0, 1, 2, 3, 4, 5]


////////////////////////////////////////////////////////////////
//сложить все книги
var friends = [ 
  { name: "Anna", books: ["Bible", "Harry Potter"], age: 21 }, 
  { name: "Bob", books: ["War and peace", "Romeo and Juliet"], age: 26 },
  { name: "Alice", books: ["The Lord of the Rings", "The Shining"], age: 18 }
  ]
  
// allbooks - список, который будет содержать все книги друзей + 
// дополнительный список указанный в initialValue
var allbooks = friends.reduce(function(prev, curr) {
return [...prev, ...curr.books];
}, ["Alphabet"]);

console.log(allbooks)
//["Alphabet", "Bible", "Harry Potter", "War and peace", "Romeo and Juliet", "The Lord of the Rings", "The Shining"]


///////////////////////////////////////////////////////////////////////
//посчитать количество каждого элемента
const count = fruitBasket.reduce( (tally, fruit) => {
  if(!tally[fruit]) {
    tally[fruit] = 1;
  } else {
    tally[fruit] += 1
  }
	// tally[fruit] = (tally[fruit] || 0) + 1 ;

	return tally;
} , {})

console.log(count) // { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }


////////////////////////////////////////////////////////////////////////
//добавить в объект свойство с полной ценой
const orders = [
  { orderId: '123', customerId: '123', deliveryDate: '01-01-2020', delivered: true, items: [
      { productId: '123', price: 55 },
      { productId: '234', price: 30 },
  ]},
  { orderId: '234', customerId: '123', deliveryDate: '01-02-2020', delivered: true, items: [
      { productId: '234', price: 30 },
  ]}]

const ordersWithTotalPrice = orders.map(order => ({...order, orderTotal: order.items.reduce((total, item) => total + item.price, 0)}))

//вывести все заказы определенного покупателя
const customerOrders = orders.filter(order => order.customerId === '123').reduce((total, item) => [...total, ...item.items], [])

console.log(customerOrders)

//было ли продан хоть раз продукт под определенным id
const isSold = orders.reduce((acc, order) => [...acc, ...order.items], []).some(item => item.productId === '123')

//сколько раз продался
const howMuchSold = orders.reduce((acc, order) => [...acc, ...order.items], []).filter(item => item.productId === '123').length


/////////////////////////////////////////////////////////////////////

const users = [
  { id: '88f24bea-3825-4237-a0d1-efb6b92d37a4', firstName: 'Sam', lastName: 'Hughes' },
  { id: '2a35032d-e02b-4508-b3b5-6393aff75a53', firstName: 'Terri', lastName: 'Bishop' },
  { id: '7f053852-7440-4e44-838c-ddac24611050', firstName: 'Jar', lastName: 'Burke' }
];

const comments = [
  { userId: '88f24bea-3825-4237-a0d1-efb6b92d37a4', text: 'Great Job!' },
  { userId: '7f053852-7440-4e44-838c-ddac24611050', text: 'Well done, I think I understand now!' },
  { userId: 'e789565f-fa5a-4d5e-8f6c-dd126cf995be', text: 'How do you do that? 😲' }
];

//добавить в users полные имя и фамилию
const usersWithFullNames = users.map((user) => ({...user, fullName: user.firstName + " " + user.lastName}))

//Добавить в комменты имена и фамилии тех, кто оставил коммент
function findUser(user, comment) {
  let curUser = user.find(person => person.id === comment.userId);
  let firstName = curUser.firstName;
  let lastName = curUser.lastName;
  return firstName + " " + lastName;
}

const commentsWithNames = comments.map(comment => ({...comment, user: findUser(users, comment)}))

//2-way
const commentsWithNames2 = comments.map(comment => {
	const { firstName, lastName} = users.find(user => user.id === comment.userId);
	return { ...comment, firstName, lastName};
	//если не кратко, то
  	//return { ...comment, firstName: firstName, lastName: lastName}
})

//кто вообще не оставлял комментариев
const haveNotComment = users.filter(user => !comments.find(comment => comment.userId === user.id))

<<<<<<< HEAD
////////////////////////////////////////////
//highlight all words which contain more than 8 characters
//+input range and show this range

let text = document.querySelector('.some_text');
const button = document.querySelector('.highlight-btn');
let range = document.querySelector('.range');
let rangeValue = document.querySelector('.rangeValue');

range.addEventListener('change', function() {
  rangeValue.textContent = range.value;
})

button.addEventListener('click', function(evt) {
  evt.preventDefault();

  text.innerHTML = text.innerText
  .split(' ')
  .map(word => word.length > range.value ? `<span style='background-color: yellow'>${word}</span>` : word)
  .join(' ');
})


////////////////////////////////////////////////////
// Сделать так, чтобы каждое предложение начиналось с новой строки
let text = document.querySelector('.some_text');
let regExp3 = /(?<=[.]+)\s+/g;
text.innerText = text.innerText.replace(regExp3, '\n');


/////////////////////////////////////////////////////
//простой пример AJAX запроса(конвертация валюты)
const inputRub = document.querySelector('#rub');
const inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
  const request = new XMLHttpRequest();

  request.open('GET', './usd.JSON');
  request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8'); 
  request.send();
  

  //status (404, 200 ...)
  //statusText(OK...)
  //respnseText / response
  //readyState (0, 1, 2, 3, 4)

  request.addEventListener('readystatechange', () => {
    if(request.readyState === 4 && request.status === 200) {
      let data = JSON.parse(request.response);
      
      inputUsd.value = inputRub.value / data.usd;
    } else {
      inputUsd.value = 'Что-то пошло не так';
    }
  })
});
=======

//РЕКУРСИЯ

// f(324) = 4 + f(32)
// f(32)  = 2 + f(3)
// f(3)   = 3  + 0 (stop here)

function sumNum(num) {
  if(num === 0) return num;
  else {
    return num % 10 + sumNum(Math.floor(num / 10));
  }
}

function sumArr(arr) {
  if(arr.length === 0) return 0;
  else {
    return arr[arr.length - 1] + sumArr(arr.slice(0, -1))
  }
}

console.log(sumArr([1, 2, 3])) // 6
console.log(sumNum(123)) // 6

function reverseString(str) {
  if (str === "")
    return "";
  else
    return reverseString(str.substr(1)) + str[0];
}
revStr('cat');
// tac


//Hamming Distance
//разница между словами

function hammingDistance(str1, str2) {
  return str1.split('')
  .filter((letter, index) => 
  letter != str2[index]).length;
}

console.log(hammingDistance("abcde", "bcdef")); // 5
console.log(hammingDistance("abcde", "abcde")); // 0
console.log(hammingDistance("strong", "strung")); // 1



/////////////////////////////////////////////////////
//пример наследования в классах

class Component {
  constructor(selector) {
    this.$el = document.querySelector(selector);
  }

  hide() {
    this.$el.style.display = 'none';
  }

  show() {
    this.$el.style.display = 'block';
  }
}

class Box extends Component {
  constructor(options) {
    super(options.selector);
    
    this.$el.style.width = this.$el.style.height = options.size + 'px';
    this.$el.style.backgroundColor = options.color;
  }
}

const box1 = new Box({
  selector: '#box1',
  size: 100,
  color: 'black'
})

class Circle extends Box {
  constructor(options) {
    super(options);
    this.$el.style.borderRadius = '50%';
  }
}

const circle = new Circle({
  selector: "#circle1",
  size: 100,
  color: 'red'
})