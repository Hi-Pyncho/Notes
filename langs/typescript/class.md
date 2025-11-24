# class

```ts
class TypeScript {
  version: string;

  constructor(version: string) {
    this.version = version;
  }

  info(name: string) {
    return `[${name}]: TypeScript version is ${this.version}`;
  }
}

class Car {
  readonly model: string;
  readonly numberOfWheels: number = 4;

  constructor(theModel: string) {
    this.model = theModel;
  }
}
//также можно такую запись сделать короче
class Car2 {
  readonly NumberOfWheels: number = 4;
  constructor(readonly model: string) {}
}
```

## модификаторы
```ts
//Модификаторы protected, public(по умолчанию), private
//protected - доступен в классе и в наследуемых классах, но не в инстансах
//private - доступен только в том классе, где был определен
class Animal {
  protected voice: string = '';
  public color: string = 'black';

  constructor() {
    this.go();
  }

  private go() {
    console.log('Go');
  }
}

class Cat extends Animal {
  public setVoice(voice: string): void {
    this.voice = voice;
  }
}
const cat = new Cat();
cat.setVoice('meow');
cat.color; // black
// cat.voice; // error(protected)
```
## абстрактные классы
```ts
//Абстрактные Классы
//реализует методы, ктр должны быть реализовны при наследовании 
//они ни во что не компилируются
abstract class Component {
  abstract render(): void;
  abstract info(): string;
}

class AppComponent extends Component {
  render(): void {
    console.log('Component on render');
  }

  info(): string {
    return 'This is info';
  }
}
```
