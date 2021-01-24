const path = require('path');

//метод basename - забирает называние файла из абсолютного пути
path.basename(__filename) //название файла
__filename //абсолютный путь к файлу
__dirname //аболютный путь директории
path.dirname(__filename) //также аболютный путь директории
path.extname(__filename) //выдаст расширение файла

path.parse(__filename) //выдает объект с информацией о файле
// и можем обращаться как к объекту
const file = path.parse(__filename);
file.ext; // .js
file.name; // path_ref.js

//генерирует путь до файла
path.join(__dirname, 'test', 'second.html')
// ...\test\second.html
//также генерирует пути, но работает с относительынми и абсолютными
path.resolve(__dirname, './test', '/second.html'); //C:\second.html