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
