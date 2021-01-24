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