const person = {
  name: "Anton",
  age: 28,
  logInfo: function(job, phone) {
    console.group(`${this.name} info`)
    console.log(`The name is ${this.name}`);
    console.log(`The age is ${this.age}`);
    console.log(`Job is ${job}`)
    console.log(`Phone is ${phone}`)
    console.groupEnd();
  }
}

const katya = {
  name: "Ekaterina",
  age: 26
}
//Bind может передавать параметры сразу после обращения к контексту. Также Bind не обращается к той функции, а возвращает новую функцию, которую потом можно вызвать
person.logInfo.bind(katya, 'Frontend-developer', 'iphone SE')();
//метод call - такой же как и Bind, но в отличие от него сразу вызывает ф-цию(не нужны ())
person.logInfo.call(katya, 'Frontend-developer', 'iphone SE');
//метод APPLY - то же самое, но всегда принимает 2 параметра, второй параметр - массив
person.logInfo.apply(katya, ['Frontend-developer', 'iphone SE']);

//функция если нужно умножить каждое число в массиве на число
const array = [1,2,3,4,5];
function multBy(arr, n) {
  return arr.map(function(i) {
    return i * n;
  })
}

console.log(multBy(array, 5));

//но эту функцию можно сделать с помощь прототипов
//обращаемся с глобальному объекту ARRAY
Array.prototype.multBy = function(n) {
  return this.map(function(i) {
    return i * n;
  })
}

console.log(array.multBy(2));
//также можно сразу в консоли запускать 
//[2,5,6].multBy(3); - и будет умноженоы


/////////////////////////////////////
//ЗАМЫКАНИЯ////
function createCalcFn (n) {
  return function() {
    console.log(1000 * n);
  }
}
console.log(createCalcFn(22));
//тут ничего не выведет, кроме самой функции
//эту функцию можно заключить в переменную
const calc = createCalcFn(22);
console.log(calc());
//и только теперь выведется. пустые скобки. так как переменная n замкнулась внутри другой функции

function createIncrementor(n) {
  return function(num) {
    return n + num;
  }
}
const addOne = createIncrementor(1);
const addTen = createIncrementor(10);
//здесь мы замкнули 1 и 10 в функции
console.log(addOne(12));
console.log(addTen(22));
//1 (т.е. n) не меняется. а 12 (т.е. num) можно менять

function urlGenerator(domain) {
  return function(url) {
    return `https://${url}.${domain}`
  }
}

const comUrl = urlGenerator('com');
const ruUrl = urlGenerator('ru');
console.log(comUrl('google'));
console.log(ruUrl('tapochekNet'));

/////////////////////////////////////
//Ассинхронность
//setTimeout()//это не из JS, а из браузерного API
//window.setTimeout()//то есть этот метод глобального объекта
console.log("Start");
console.log("Start2");

function timeout2s() {
  console.log('after 3 sec')
}

setTimeout(function() {
  console.log("Show up after 2s");
}, 2000);
//принимает 2 параметра: функцию и время

console.log("End");
//выводятся обычные консоли логи синхронно, а setTimeout ассинронно

setTimeout(timeout2s, 3000);

//как создать мини-игру для случайной подстановки слов
var array = ['anton', 'katya', 'lena', 'victor'];

var randomNumber = Math.floor(Math.random() * array.length);

console.log(array[randomNumber]);

//рандомизатор случайных нечетных чисел
let array = [];
for(var i = 1; i < 50; i += 2) {
  array.push(i);
}

function randomOddNumber(array) {
  let num = Math.floor(Math.random() * array.length);
  console.log(array[num]);
}

randomOddNumber(array);


///пример объекта с методами
var wizard = {
  name: "Gendalf",
  age: 78,
  level: 10,
  say: function() {
    console.log("You have no pass! My name is " + wizard.name + " and my level is " + wizard.level)
  },
  levelUp: function(level) {
    wizard.level += level;
  }
}

wizard.say();
wizard.levelUp(5);
wizard.say();







///////////////ПЕРЕДАЧА ЗНАЧЕНИЙ ПО ССЫЛКЕ И ПО ЗНАЧЕНИЮ//////////////////

// ПЕРЕДАЧА ЗНАЧЕНИЯ ПО ССЫЛКУ ЧЕРЕЗ МАССИВ
var array = [2, 4];

function increaseBySix(val) {
  return val[0] += 6;
}

//тут сохраняется значение до выполнения функции
var number = array[0]; 

console.log(increaseBySix(array));//8
console.log(array[0]);//8
console.log(number);//2


//ПЕРЕДАЧА ЗНАЧЕНИЯ ПО ССЫЛКЕ ЧЕРЕЗ ОБЪЕКТ
var obj = {prop: 5};

function incrByFive(val) {
  return val.prop += 5;
}

//тут сохраняется значение до выполнения функции
var objNumber = obj.prop;

console.log(incrByFive(obj));//10
console.log(obj.prop);//10
console.log(objNumber);//5

//ПЕРЕДАЧА ЗНАЧЕНИЯ ПО ЗНАЧЕНИЮ
var num = 6;
var bool = true;
var str = 'Hello';

function changeVal(val) {
  return val += 2;
}

console.log(changeVal(num));//8
console.log(num);//6
console.log(changeVal(str));//Hello2
console.log(str);//Hello

/////////////////////////////////////////////


//////ТЭГ TEMPLATE////////
<template id='temp'>
  <div>
    <span>
      
    </span>
  </div>
</template>

///находим его в разметке
var template = document.querySelector('#temp').content.querySelector('div');
//создаем цикл для создания нескольких объектов
for (var i = 0; i <= 6; i++) {
  /*здесь клонируем див, чтобы была передача по значению
  иначе будет просто передача по ссылке
  нельзя использовать шаблон - нужно копировать его
  и только потом изменять*/
  var element = template.cloneNode(true);
  element.children[0].textContent(i);
  pools[1].appendChild(element);
};

///объекты в массивах
var wizards = [
  {
    name: 'Gendalf',
    coatColor: 'red'
  },
  {
    name: 'Morty',
    coatColor: 'blue'
  }
]
//теперь можно пройтись по массиву-объекту
for (var i = 0; i < 2; i++) {
  //клонируем шаблон
  var wizardElement = similarWizardTemplate.cloneNode(true);
  //точечно изменяем что нужно
  wizardElement.querySelector('.setupSimilarLabel').textContent = wizards[i].name;
  wizardElement.querySelector('.wizardCoat').style.fill = wizards[i].coatColor;

  similarWizardList.appendChild(wizardElement);
}




/////////////////////ВАЛИДАЦИЯ ФОРМЫ////////////////////

/*
badInput - введено неправильное значение
customError - задано кастомное сообщение об ошибке
pattertnMismatch - не соответствует патерну
rangeOverflow - больше значения max
rangeUnderflow - меньше значения min
stepMismatch - не попадает значение в step
tooLong - больше максимальной длин
tooShort - слишком короткое значение
typeMismatch - не совпадает тип
valid - валидно ли поле
valueMissing - нет значение
*/

var userNameInput = document.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function(evt) {
  if(userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов')
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 10-ти символов')
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Ты пропустил, заполни!')
  }
    
});

/////////////СЛОЖНЫЕ СЦЕНАРИИ/////////////////
var userForm = document.querySelector('.user-form');
var block = document.querySelector('.block');

document.addEventListener('keydown', function(evt) {
  if (event.code == 'Escape') {
    console.log('Выход!')
  } else if (event.code == "ShiftLeft" || event.code == "KeyA") {
    block.style.backgroundColor = 'red';
  }

  console.log(evt.keyCode);
  console.log(event.code);
})

document.addEventListener('keydown', function() {
  if (event.code == "Escape") {
    block.classList.add('hidden');
  } else if (block.classList.contains('hidden') && event.code == 'KeyQ') {
    block.classList.remove('hidden');
  }
})


///////ПРИМЕР ДЕЛЕГИРОВАНИЯ////

//сначала выбираем форму
var userForm = document.querySelector('.user-form');

//накладываем на нее обработчик
userForm.addEventListener('invalid', function(evt) {
// и красим все что невалидно в красную рамку
  evt.target.style.border = '2px solid red';
}, true);
//ставит 'true', чтобы произвести захват










/////////один из способов dragNdrop//////////////

var drag = document.querySelector('.dragNdrop');

drag.addEventListener('mousedown', function(evt) {
  //на всякий случай отменить действие по умолчанию
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function(moveEvt) {
    moveEvt.preventDefault();
    //измеряем смещение
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    //записываем новую стартовую точку, относительно которой будем определять то самое смещение
    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
  //Свойство offsetTop содержит смещение элемента сверху относительно offsetParent. 
  //Содержит расстояние от offsetParent до границы элемента. 
  //offsetLeft - отступ от левого края стринцы
  //добавляем смещение (shift) к текущим координатам элемента
    drag.style.top = (drag.offsetTop - shift.y) + 'px';
    drag.style.left = (drag.offsetLeft - shift.x) + 'px';
  };
  
  var onMouseUp = function(upEvt) {
    upEvt.preventDefault();
  
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousepup', onMouseUp);
  }

  //тут подпись на document, а не на drag, потому что передвигаем курсор быстро
  //drag слишком маленький. то есть это ограничитель
  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', onMouseUp);

});






///////другой способ dragNdrop///////////
let ball = document.querySelector('.ball');

ball.onmousedown = function(event) {
  // Когда человек нажимает на мячик (mousedown) – запомним расстояние от курсора до левого верхнего угла шара в переменных shiftX/shiftY. Далее будем удерживать это расстояние при перетаскивании.Чтобы получить этот сдвиг, мы можем вычесть координаты:
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // переносит мяч на координаты (pageX, pageY),
  // дополнительно учитывая изначальный сдвиг относительно указателя мыши
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // передвигаем мяч при событии mousemove
  document.addEventListener('mousemove', onMouseMove);

  // отпустить мяч, удалить ненужные обработчики
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};




///////ЗАМЫКАНИЯ///////////

let dog = 5;

function teremok() {
  let mouse = 1;
  let frog = 2;
  let cow = 10;

  function room() {
    //здесь значение frog замыкается и независимо от внешней функции
    frog = 3;
    let cat = 4;
    //здесь обращается к глобальной, вне функции
    console.log(`dog = ${dog}`);
    //здесь обращается к внешней функции
    console.log(`mouse = ${mouse}`)
    //здесь обращается к текущей функции
    console.log(`frog = ${frog}`);
  }

  //эта функция изменит уже существующую переменную
  function itChangeCow() {
    cow = 20;
    return cow++;
  }

  //эта же функция создаст переменную с таким же именем, но независимую от предыдущей
  function itDoesnotChangeCow() {
    //это называется VARIABLE SHADOWING - когда повторяется имя переменной
    let cow = 102;
    return mouse;
  }
  
  itDoesnotChangeCow();
  itChangeCow();
  console.log(`cow = ${cow}`);// 21
  console.log(`frog = ${frog}`);// 2
  //эта функция выдаст в консоль независимые от текущей функции значения, не меняя ничего
  room();//5, 1, 3
  
}

teremok();

console.log(window.dog);




///////САМОВЫЗЫВАЮЩАСЯ ФУНКЦИЯ///////////

(function() {console.log("hi")})();

//ЭКСПОРТ///

(function() {
  var ESC_KEYCODE = 27;

  window.isEscKeycode = function(evt) {
    return evt.keyCode === ESC_KEYCODE;
  };
})();

(function() {
  if(window.isEscKeycode())
})


/////////////ПОТЕРЯ ОКРУЖЕНИЯ//////////////////

var buttons = document.querySelectorAll('.button');

for(var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  button.addEventListener('click', function(evt) {
    //тут обращается к значению button в цикле for
    //но так как листенер ассинхронный и цикл свое отработал
    //то значение button застревает на значении последней итерации
    console.log(button.value);
  })
};

//проблему можно решить так

//в этой функции button будет ссылаться не на тот, который в цикле
//а тот, который был при нажатии
var addClickListener = function(button) {//то есть на этот button
  button.addEventListener('click', function(evt) {
    console.log(button.value);
  })
};

for(var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  addClickListener(button);
}
