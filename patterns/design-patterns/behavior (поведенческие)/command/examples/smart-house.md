```js
// Command: интерфейс команды
class Command {
  execute() {}
  undo() {}
}

// ConcreteCommand: команды для устройств
class TurnOnCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
  }

  execute() {
    this.device.turnOn();
  }

  undo() {
    this.device.turnOff();
  }
}

class TurnOffCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
  }

  execute() {
    this.device.turnOff();
  }

  undo() {
    this.device.turnOn();
  }
}

// Receiver: устройства (лампочка, телевизор)
class Light {
  turnOn() {
    console.log("Свет включен");
  }

  turnOff() {
    console.log("Свет выключен");
  }
}

class TV {
  turnOn() {
    console.log("Телевизор включен");
  }

  turnOff() {
    console.log("Телевизор выключен");
  }
}

// Invoker: пульт управления
class RemoteControl {
  constructor() {
    this.commands = [];
    this.history = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  pressButton(index) {
    if (this.commands[index]) {
      this.commands[index].execute();
      this.history.push(this.commands[index]);
    }
  }

  pressUndo() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
    }
  }
}

// Использование
const light = new Light();
const tv = new TV();

const remote = new RemoteControl();
remote.addCommand(new TurnOnCommand(light));    // Кнопка 0: включить свет
remote.addCommand(new TurnOffCommand(tv));     // Кнопка 1: выключить телевизор

remote.pressButton(0);  // Свет включен
remote.pressButton(1);  // Телевизор выключен
remote.pressUndo();     // Телевизор включен (отмена последней команды)
```
