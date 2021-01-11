

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











// firstRevolver.style.display = 'none'




// id
// bum1, bum2
// revolver1, revolver2
// dead_eyes, skull_top, jaw, hat, class(enemy)




// bulletContainer.append(getBulletLetter('G'))
// bulletContainer.append(getBulletLetter('G'))





// setBulletWord('heLLo')
// bulletContainer.innerHTML = ''

// bulletContainer.removeChild(bulletContainer.firstElementChild)
// bulletContainer.removeChild(bulletContainer.firstElementChild)
// console.log(bulletContainer.firstElementChild)




// звук выстрела при удаче, звук осечки при неудаче









// const letters = document.querySelectorAll('.bullet-letter')
// let letter = ''

// for(e of letters) {
//   letter += e.textContent
// }

// console.log(letter)










