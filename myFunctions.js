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