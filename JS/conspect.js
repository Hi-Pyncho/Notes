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



//FullScreen Api
const img = document.querySelector('img')
img.addEventListener('click', toggleScreen)

function toggleScreen() {
  if(!document.fullscreenElement) {
    img.requestFullscreen()
  }else {
    if(document.fullscreenEnabled) {
      document.exitFullscreen()
    }
  }
  }
}

// прослушка HTML на изменение полноэкранного режима
document.documentElement.addEventListener('fullscreenchange', function() {
  console.log('some actions')
})


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