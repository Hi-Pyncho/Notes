//Мини-штука, которая меняет цвет по нажатию кнопки

let btn = document.querySelector('#btn');

let color = ['red', 'yellow', 'blue', 'magenta'];
//let changedColor = Math.floor(Math.random() * color.length);
//не сработало. Выдавало ошибку. Но сработала функция
function changedColor() {
  return Math.floor(Math.random() * color.length);
}

function changeMoreColor() {
  let one = Math.floor(Math.random() * 255);
  let two = Math.floor(Math.random() * 255);
  let three = Math.floor(Math.random() * 255);
  return `rgb(${one}, ${two}, ${three})`;
}

btn.addEventListener('click', function() {
  document.querySelector('.block').style.backgroundColor = color[changedColor()];
});


btn.addEventListener('dblclick', function() {
  document.querySelector('.block').style.backgroundColor = changeMoreColor();
});



console.log(changedColor());
console.log(changeMoreColor());