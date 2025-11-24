# Устройства и пульты управления
```js
// Реализация (Implementor)
class Device {
  turnOn() {
    throw new Error("Method 'turnOn' must be implemented");
  }

  turnOff() {
    throw new Error("Method 'turnOff' must be implemented");
  }

  setChannel(channel) {
    throw new Error("Method 'setChannel' must be implemented");
  }
}

// Конкретные реализации (Concrete Implementors)
class TV extends Device {
  turnOn() {
    console.log("TV: Turning on");
  }

  turnOff() {
    console.log("TV: Turning off");
  }

  setChannel(channel) {
    console.log(`TV: Setting channel to ${channel}`);
  }
}

class Radio extends Device {
  turnOn() {
    console.log("Radio: Turning on");
  }

  turnOff() {
    console.log("Radio: Turning off");
  }

  setChannel(channel) {
    console.log(`Radio: Setting frequency to ${channel}`);
  }
}

// Абстракция (Abstraction)
class RemoteControl {
  constructor(device) {
    this.device = device;
  }

  togglePower() {
    throw new Error("Method 'togglePower' must be implemented");
  }

  changeChannel(channel) {
    throw new Error("Method 'changeChannel' must be implemented");
  }
}

// Уточненная абстракция (Refined Abstraction)
class AdvancedRemoteControl extends RemoteControl {
  togglePower() {
    this.device.isOn ? this.device.turnOff() : this.device.turnOn();
  }

  changeChannel(channel) {
    this.device.setChannel(channel);
  }

  mute() {
    console.log("Advanced remote: Muting");
  }
}

// Использование
const tv = new TV();
const radio = new Radio();

const tvRemote = new AdvancedRemoteControl(tv);
const radioRemote = new AdvancedRemoteControl(radio);

tvRemote.togglePower(); // TV: Turning on
tvRemote.changeChannel(5); // TV: Setting channel to 5

radioRemote.togglePower(); // Radio: Turning on
radioRemote.changeChannel(101.5); // Radio: Setting frequency to 101.5
```
Структура паттерна:
- Абстракция (Abstraction) → RemoteControl (и его уточнение AdvancedRemoteControl)
  - Определяет интерфейс управления (togglePower(), changeChannel()), но не зависит от конкретных устройств.
- Реализация (Implementor) → Device (и его конкретные варианты TV, Radio)
  - Предоставляет низкоуровневые методы (turnOn(), setChannel()), но не знает, как их использует пульт.
- Мост (Bridge) → Связь между RemoteControl и Device через композицию
  - RemoteControl хранит ссылку на Device (this.device) и вызывает его методы.
Где здесь Bridge?
- AdvancedRemoteControl не наследует TV или Radio, а работает с ними через общий интерфейс Device.
- Можно добавить новое устройство (например, SmartSpeaker), и пульт будет работать без изменений.
- Можно добавить новый пульт (например, VoiceRemote), и он будет совместим со всеми устройствами.
Вывод:
Мост здесь — это композиция RemoteControl + Device, позволяющая им эволюционировать независимо.

