//Rest & Spread

//...rest должен всегда располагаться в конце

function sumAll(...args) { // args — имя массива
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1, 2, 3) ); // 6

//...spread
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
//можно вперемешку
alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

//для слияния массивов
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15 (0, затем arr, затем 2, в конце arr2)

//оператор расширения подойдёт для того, чтобы превратить строку в массив символов:
let str = "Привет";
//под капотом использует итераторы, например как for of
alert( [...str] ); // П,р,и,в,е,т

//Array.from()
let str = "Привет";

// Array.from преобразует перебираемый объект в массив
alert( Array.from(str) ); // П,р,и,в,е,т

// Но между Array.from(obj) и [...obj] есть разница:
//---Array.from работает как с псевдомассивами, так и с итерируемыми объектами
//---Оператор расширения работает только с итерируемыми объектами
//Выходит, что если нужно сделать из чего угодно массив, то Array.from — более универсальный метод.

//если я хочу передать новый объект, содержащий все предыдущие поля, и поменять одно, можно сделать так:
const a = {
    name: "Vanya",
    age: 30,
    job: "driver",
};

const b = {
   ...a,
   age: 40,
};

// b = {name: "Vanya", age: 40, job: "driver"};

Работает как Object.assign

const c = Object.assign({}, a, {age: 20});

// c = {name: "Vanya", age: 20, job: "driver"};


/////////////////////////////////////////////////////
//---Потеря окружения---

let name = 'Global user';

var obj = {
  name: 'Bob',
  greet: function() {
    setTimeout(function() {
      console.log(`hello, ${this.name}`)
    }, 2000);
  }
}

obj.greet()//hello, Global user

//здесь спасают стелочные функции, так как у них нет
// своего this, и они обращаются к внешней функции

let obj = {
  name: 'Bob',
  greet: function() {
    setTimeout(() => {
      console.log(`hello, ${this.name}`)
    }, 2000);
  }
}

obj.greet()//hello, Bob

//////////////////////////////////////////////
// деструкторизация

const par = document.querySelectorAll('p');
//так в одну строчку можно перебрать псевдомассив превратив его в массив
Array.from(par).forEach(({textContent: text}) => console.log(text))

//меняем местами переменные
let num1 = 1;
let num2 = 10;
[num1, num2] = [num2, num1];

//дестр объекта
const obj = {
	name: 'bob',
	age: 2,
}

const {name: cat} = obj;
console.log(cat)// bob

//можно совмещать объект и массив
const par = document.querySelectorAll('p');

const [,{textContent: text}] = par;//выведется текст второго элемента массива

//деструкт вглубь объекта
const obj = {
	address: {
		city: 'London',
		street: 'Bla-bla'
	}
}

const {address: {street: currentStreet}} = obj;


///////////////////////////////////////////////////
//короткая запись объектов в ES6

const name = 'bob';
const age = 42;
const male = 'man';

// можно миксовать
const cat = {name, catAge: age, male};

console.log(cat)
//{name: "bob", age: 42, male: "man"}




//////////////////////////////////////////////////
//оценка производительности скрипта

var t0 = performance.now();
doSomething();
var t1 = performance.now();
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

//а также засечь время сколько потребовалось на действие
console.time("answer time");
alert("Click to continue");
console.timeLog("answer time");
alert("Do a bunch of other stuff...");
console.timeEnd("answer time");
// answer time: 2192.10986328125ms
// answer time: 5388.81298828125ms
// console.timeLog => Выводит в консоль текущее значение таймера, запущенного вызовом console.time().


////////////////////////////////////////
//пример промисов
console.log('Request data...')

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Preparing data...');

    const data = {
      server: 'asw',
      port: 2000,
      status: 'working'
    };

    resolve(data);
  }, 2000);
})

p.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true;
      resolve(data);
    }, 2000);
  })
}).then(data => {
  console.log('Data recieved', data);
})

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

sleep(2000).then(() => console.log('After 2 seconds'));
sleep(3000).then(() => console.log('After 3 seconds'));

//сработает, когда успешно завершатся все промисы. если хотя бы один
// отклонен, то Promise.all отклонится тоже
Promise.all([sleep(5000), sleep(2000)]).then(() => {
  console.log('All promises');
})

// и данные приходят в том порядке, в каком указали в параметрах
//p3 = 4
//p3 = 3
//p = 2
Promise.all([p3, p2, p]).then((data) => {
  console.log(data)
}); // [4, 3, 2]
//Ожидает исполнения или отклонения любого из полученных промисов.
// Возвращает промис, который будет исполнен или отклонен с результатом 
// исполнения первого исполненного или отклонённого промиса из .iterable.
Promise.race([sleep(5000), sleep(2000)]).then(() => {
  console.log('Race promises');
})
