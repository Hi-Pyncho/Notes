

-------for(let key in object)------------
//проблема в том, что он может пробежаться и по
// прототипу. поэтому лучше добавлять проверку

for(let key in person) {
	if(person.hasOwnProperty(key)) {
		console.log(`${key} : ${person[key]}`);		
	}
}


////////////////////////////////////////////
------------Object.keys(o)---------------
// Этот метод возвращает массив со всеми собственными 
// (те, что в цепочке прототипов, не войдут в массив) именами перечисляемых свойств объекта o.

console.log(Object.keys(person))
//возвращает массив из ключей


////////////////////////////////////////////
-------Object.getOwnPropertyNames(o)------
// Этот метод возвращает массив содержащий все имена своих свойств 
// (перечисляемых и неперечисляемых) объекта o.

console.log(Object.getOwnPropertyNames(person))
//также возвращает массив
//["name", "tails", "power", "sleepHours"]


///////////////////////////////////////////////
// Флаги и дескрипторы свойств
--value => свойство или пустая строка если нет
--writable => если true, свойство можно изменить, иначе оно только для чтения
--enumerable => если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют
--configurable => если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя

-----Object.getOwnPropertyDescriptor-----;
//позволяет получить полную информацию о свойстве.
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

-----Object.defineProperty--------
//позволяет изменять флаги
Object.defineProperty(obj, propertyName, descriptor)

Object.defineProperty(user, "name", {
  writable: false
});//только для чтения
//Например, свойство Math.PI – только для чтения, неперечислимое и неконфигурируемое

------Object.defineProperties(obj, descriptors)---------
//позволяет определять множество свойств сразу

Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});

-------Object.preventExtensions(obj)------
//делает объект нерасширяемым - нельзя
//добавлять новые свойства

-------Object.seal(obj)-----------
// Запрещает добавлять/удалять свойства. 
// Устанавливает configurable: false для всех существующих свойств.

-----Object.freeze(obj)--------
// Запрещает добавлять/удалять/изменять свойства. 
// Устанавливает configurable: false, writable: false для всех существующих свойств.

////////А также есть методы для их проверки://///////////
---------Object.isExtensible(obj)---------
//Возвращает false, если добавление свойств запрещено, иначе true.
----------Object.isSealed(obj)---------
//Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств установлено configurable: false.
----------Object.isFrozen(obj)--------
//Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено configurable: false, writable: false. 


//ДЕСТРУКТУРИЗАЦИЯ
const obj = {
	name: {
		first: 'Bob',
		last: 'Bobchinski'
	},
	age: 29
}

const {name: {first: firstName, last: lastName}, age} = obj

//передача значений по умолчанию
const {role = 'user'} = obj

//передача пустого объекта (или чего другого) по умолчанию, если такого нет в функции или объекте
const {permission: {role = 'user'} = {}} = obj

//передача деструктурированного объекта в функцию
// с иницилизацией значений по умолчанию
function connect({
  host = 'localhost',
  port = 443,
  user = 'guest'
} = {}) {
  console.log(host, port, user)
}
//изменится только порт
connect({
  port: 80
})
//можно и без параметров
connect()

//rest
const dict = {
	duck: 'quack',
	dog: 'wuff',
	mouse: 'squeak'
}
//в otherAnimals попадут dog и mouse
const {duck, ...otherAnimals} = dict
// скопирует объект и добавит новый элемент
const newDict = {
	...dict,
	cat: 'meow'
}
// это можно сделать также при помощи Object.assign
const obj1 = {
  name: 'bob',
  legs: 4
}

const obj2 = {
  name: 'chaki',
  age: 12
}

const result = Object.assign({}, obj1, obj2)
console.log(result)

///
// можно комбинировать деструктуризацию объектов и массивов
const shape = {
  type: 'segment',
  coordinates: {
    start: [10, 15],
    end: [17, 15]
  }
}

const {coordinates: {start: [startX, startY], end: [endX, endY]}} = shape

console.log(startX, startY, endX, endY)



// КЛАССЫ
class Animal {
	constructor(name, voice) {
    this.name = name
    this.voice = voice
  }

  say() {
    console.log(this.name, 'goes', this.voice)
  }
}

class Bird extends Animal {
  constructor(name, voice, canFly) {
    super(name, voice)
    // можно обращаться к методам заимствованного класса
    // и вызызывать функци, которая сработает сразу после создания
    // экземпляра класса
    super.say()
    this.say() //обратится уже к реализации функции этого класса
    this.canFly = canFly
  }

  say() {
    console.log('Birds don\'t like to talk')
  }
}

const duck = new Bird('Duck', 'quack', true)

//
class Counter {
  //свойство текущего класса
  count = 0
  // свойства привязанные к экземпляру объекта
  // за счет стрелочной функции
  increase = () => {
    this.count += Counter.incrementStep
    console.log(this.count)
  }
  // свойство, принадлежащее только классу
  static incrementStep = 2
  static incrementAll = (arr) => {
    arr.forEach((c) => c.inc())
  }
}

Counter.incrementAll([])

const counter = new Counter()
counter.increase() // 2

const counter2 = new Counter()
counter2.increase() // 2
counter2.increase() // 4