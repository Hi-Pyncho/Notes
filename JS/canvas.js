////////CANVAS///////////////////
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var gradient = ctx.createLinearGradient(0, 0, 300, 150);
gradient.addColorStop(0, 'green');
gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

var radialGradient = ctx.createRadialGradient(150, 72, 0, 150, 72, 72);
radialGradient.addColorStop(0, 'red');
radialGradient.addColorStop(1, 'blue');

ctx.fillStyle = 'blue';
ctx.fillStyle = gradient;
ctx.fillRect(0,0,150,300);

ctx.strokeStyle = 'black';
ctx.strokeRect(160, 0, 100, 100);

ctx.clearRect(0, 0, 50, 100);


ctx.beginPath();//начать контур
ctx.moveTo(100, 100);
ctx.lineTo(150, 150);
ctx.lineTo(200, 100);
ctx.bezierCurveTo(220, 80, 240, 60, 260, 80);
ctx.strokeRect(260, 80, 30, 50);
ctx.closePath()//закончить контур
ctx.stroke();//обвести линию
ctx.fill();//заливка фигуры
ctx.fill('evenodd')//удалятся самопересечения фигуры

ctx.font = '30px Tahoma';
ctx.textBaseline = 'hanging';
ctx.fillText('hello', 10, 10);

//изначально канвас - 300на150 пикселей
<canvas width = '300' height = '150'></canvas>
//чтобы изменить внутренние координаты канваса



//рандомизация чисел в RGB
var color1 = Math.floor(Math.random() * 255);
var color2 = Math.floor(Math.random() * 255);
var color3 = Math.floor(Math.random() * 255);
var finalColor = `rgb(${color1}, ${color2}, ${color3})`;