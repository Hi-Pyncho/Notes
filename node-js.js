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





//------EXPORT
module.exports = {
  user: user,
  sayHello() {
    console.log(`hello, ${user}`)
  }
}
//подключаем
const name = require('pathToFile')






// =====FILE SYSTEM
//File System
const fs = require('fs');
const path = require('path');

//есть также mkdirSync - синхронный способ содания
// но не рекомендуется
//первый параметр всегда error - для обработки ошибок. Если ошибки нет, то error == null

fs.mkdir(path.join(__dirname, 'notes'), (error) => {
  if(error) throw new Error(error);

  console.log('Папка была создана');
})

fs.writeFile(path.join(__dirname, 'notes', 'mynotes.txt'),
  'Hello, World',
  (error) => {
    if (error) throw error;
    console.log('Файл был создан');

    fs.appendFile(
      path.join(__dirname, 'notes', 'mynotes.txt'),
      ' From append file',
      (error) => {
        if (error) throw error;
        console.log('Файл был изменен');
        //чтобы вызвать последовательно, а не ассинхронно
        fs.readFile(path.join(__dirname, 'notes', 'mynotes.txt'),
          (error, data) => {
            if (error) throw error;
            console.log(data); // <Buffer ...numbers>
            console.log(Buffer.from(data).toString());
          }
        )
      }
    )
  }
)
// ассинхронно добавит новое изменение
fs.appendFile(path.join(__dirname, 'notes', 'mynotes.txt'),
  ' Еще одно изменение.',
  (error) => {
    if (error) throw error;
    console.log('Новое изменение');
  }
)
// => Hello, World Еще одно изменение. From append file

fs.readFile(path.join(__dirname, 'notes', 'mynotes.txt'),
  (error, data) => {
    if (error) throw error;
    console.log(data); // <Buffer ...numbers>
    console.log(Buffer.from(data).toString());
  }
)

//такой же результат можно получить, указав кодировку в параметрах
fs.readFile(path.join(__dirname, 'notes', 'mynotes.txt'),
  'utf-8',
  (error, data) => {
    if (error) throw error;
    console.log(data); // <Buffer ...numbers>
  }
)

fs.rename(
  path.join(__dirname, 'notes', 'mynotes.txt'),
  path.join(__dirname, 'notes', 'notes.txt'),
  (error) => {
    if(error) throw error;
    
    console.log('The file is renamed');
  }
)





// ==== OS
const os = require('os');

// платформа
console.log(os.platform());

// архитектура
console.log(os.arch());

// информация
console.log(os.cpus());

// свободная память
console.log(os.freemem());

// сколько всего памяти
console.log(os.totalmem());

// корневая директория
console.log(os.homedir());

// сколько система работает в секундах
console.log(os.uptime());





// ===EVENTS
const EventEmmiter = require('events');
const { emit } = require('process');

// внутри есть два метода emit и on
class Logger extends EventEmmiter {
  log(message) {
    this.emit('message', `${message} ${Date.now()}`) // событие message
  }
}

const logger = new Logger();

//добавлять прослушку перед эмитом
logger.on('message', data => {
  console.log(data);
})

logger.log('Hello');




//Взаимодействие с консолью
// console.log(process.argv);
function consoleToJSON() {
  const consoleObj = {};

  for(let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i].split('=');
    // по конвенции если передан один аргумент, без значения
    // то тогда это булево значение
    consoleObj[arg[0]] = arg[1] ? arg[1] : true;
  }

  return consoleObj;
}
// node test.js message=hello spec
// ==> { message: 'hello', spec: true }
console.log(consoleToJSON())




//Server
const http = require('http')

const server = http.createServer((request, response) => {
  // функция handler
  console.log(request.url)

  response.write('<h1>Hello from NodeJS</h1>')
  response.write('<h2>Hello from NodeJS</h2>')
  response.write('<h3>Hello from NodeJS</h3>')
  response.end(`
    <div style='background: red; width: 200px; height: 200px'>
      <h1>test 1</h1>
    </div>
  `)
})

server.listen(3000, () => {
  console.log('Server is running')
})

///next server example
const server = http.createServer((request, response) => {
  if(request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(`
      <h1>Form</h1>
      <form method='post' action='/'>
        <input name='title' type='text' />
        <button type='submit'>Send</button>
      </form>
    `)
  } else if(request.method === 'POST') {
    const body = []

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    //данные поступают в виде чанков (буфер)
    //добавим слушатель
    request.on('data', data => {
      body.push(Buffer.from(data))
    })
    //когда данные полностью придут
    request.on('end', () => {
      const message = body.toString().split('=')[1]

      response.end(`
      <h1>Your message: ${message}</h1>
    `)
    })
  }
})

server.listen(3000, () => {
  console.log('Server is running')
})


//another server example
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
  if(request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    if(request.url === '/') {
      fs.readFile(
        path.join(__dirname, 'views', 'index.html'),
        'utf-8',
        (error, content) => {
          if(error) throw error

          response.end(content)
        }
      )
    } else if(request.url === '/about') {
      fs.readFile(
        path.join(__dirname, 'views', 'about.html'),
        'utf-8',
        (error, content) => {
          if(error) throw error

          response.end(content)
        }
      )
    } else if(request.url === '/api/users') {
      response.writeHead(200, {
        'Content-Type': 'text/json'
      })

      const users = [
        {name: 'bob', age: 10},
        {name: 'chaki', age: 12}
      ]

      response.end(JSON.stringify(users))
    }

  } else if(request.method === 'POST') {
    const body = []

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    //данные поступают в виде чанков (буфер)
    //добавим слушатель
    request.on('data', data => {
      body.push(Buffer.from(data))
    })
    //когда данные полностью придут
    request.on('end', () => {
      const message = body.toString().split('=')[1]

      response.end(`
      <h1>Your message: ${message}</h1>
    `)
    })
  }
})

server.listen(3000, () => {
  console.log('Server is running')
})