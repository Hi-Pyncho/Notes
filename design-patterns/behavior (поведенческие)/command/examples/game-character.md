```js
// Command: интерфейс команды
class Command {
  execute() {
    throw new Error("Method 'execute' must be implemented");
  }

  undo() {
    throw new Error("Method 'undo' must be implemented");
  }
}

// ConcreteCommand: конкретные команды
class MoveUpCommand extends Command {
  constructor(character) {
    super();
    this.character = character;
    this.prevY = 0;
  }

  execute() {
    this.prevY = this.character.y;
    this.character.move(0, -10);
    console.log(`Персонаж движется вверх. Новая позиция: (${this.character.x}, ${this.character.y})`);
  }

  undo() {
    this.character.y = this.prevY;
    console.log(`Отмена! Персонаж возвращен в позицию: (${this.character.x}, ${this.character.y})`);
  }
}

class MoveRightCommand extends Command {
  constructor(character) {
    super();
    this.character = character;
    this.prevX = 0;
  }

  execute() {
    this.prevX = this.character.x;
    this.character.move(10, 0);
    console.log(`Персонаж движется вправо. Новая позиция: (${this.character.x}, ${this.character.y})`);
  }

  undo() {
    this.character.x = this.prevX;
    console.log(`Отмена! Персонаж возвращен в позицию: (${this.character.x}, ${this.character.y})`);
  }
}

// Receiver: получатель команд (игровой персонаж)
class Character {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

// Invoker: инициатор команд (управление вводом + история)
class InputHandler {
  constructor() {
    this.commands = [];
    this.history = [];
  }

  setCommand(command) {
    this.commands.push(command);
  }

  executeCommand(index) {
    if (this.commands[index]) {
      this.commands[index].execute();
      this.history.push(this.commands[index]);
    }
  }

  undoLastCommand() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
    }
  }
}

// Использование
const character = new Character();
const inputHandler = new InputHandler();

// Назначаем команды на кнопки (0 - вверх, 1 - вправо)
inputHandler.setCommand(new MoveUpCommand(character));
inputHandler.setCommand(new MoveRightCommand(character));

// Игрок нажимает "Вверх" → "Вправо" → "Отмена"
inputHandler.executeCommand(0);  // Персонаж движется вверх. Новая позиция: (0, -10)
inputHandler.executeCommand(1);  // Персонаж движется вправо. Новая позиция: (10, -10)
inputHandler.undoLastCommand();  // Отмена! Персонаж возвращен в позицию: (0, -10)
```
