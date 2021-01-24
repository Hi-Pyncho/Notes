//------EXPORT
module.exports = {
  user: user,
  sayHello() {
    console.log(`hello, ${user}`)
  }
}
//подключаем
const name = require('pathToFile')
