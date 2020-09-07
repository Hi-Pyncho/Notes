const str: string = 'Hello';
const int: number = 42;
const float: number = 42.42;
const bool: boolean = true;
const numArray: number[] = [1, 1, 2, 3, 5, 8, 13];
//Generic types
const numArray2: Array<number> = [1, 1, 2, 3, 5, 8, 13];
//tuple. Порядок важен!
const contacts: [string, number, string] = ['Bob', 42, 'Cat'];
//Any
let variable: any = 42;
variable = 'new string';

// let v1: void = null; // ошибка
let v2: void = undefined; // не ошибка

//возвращает что-то или нет
function sayMyName(name: string): void {
    console.log(name);
}

//Never - значение никогда не наступит
function error(message: string): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {
    }
}

//type, позволяет создавать свои типы, алиасы
type Login = string;
const login: Login = 'me!';

type ID = string | number;
const id1: ID = 123;
const id2: ID = '123';
//null и undefined редко используются
type SomeType = number | null | undefined;

//==========================================

//Интерфейсы - нужно реализовать все обязательные поля
//readonly для чтения
//? необязательно
interface Rect {
    readonly id: string,
    color?: string,
    size: {
        width: number,
        height: number
    }
}

const rect: Rect = {
    id: 'bob',
    size: {
        width: 100,
        height: 50
    },
    color: '#ccc'
}
//определить можно так тип
const rect2 = {} as Rect;

//==========================
//Наследование интерфейсов
interface RectWithArea extends Rect {
    getArea: () => number;
}

const rect3: RectWithArea = {
    id: '223',
    size: {
        width: 200,
        height: 300
    },
    getArea(): number {
        return this.size.width * this.size.height;
    }
}

//Интерфейсы и Классы
interface IClock {
    time: Date;
    setTime(date: Date): void;
}

class Clock implements IClock {
    time: Date = new Date();
    setTime(date: Date): void {
        this.time = date;
    }
}

//Если нужно перечислить свойства не зная точно сколько их будет
interface Styles {
    [key: string]: string;
}

const css: Styles = {
    border: '1px solid black',
    marginTop: '2px',
    borderRadius: '5px'
}

//================================
//Enums
enum Membership {
    Basic,
    Standart,
    Premium
}

const membership = Membership.Standart;
const membershipReverse = Membership[2];
console.log(membership) //1
console.log(membershipReverse) //Premium

enum SocialMedia {
    VK = 'vkontakte',
    FACEBOOK = 'Facebook',
    INSTAGRAM = 'instagram'
}

const social = SocialMedia.INSTAGRAM;
console.log(social);// instagram

//======================================
//Functions
//TypeScript будет умнее подсказывать методы, когда знает, какой ждать тип
function add(a:number, b:number): number {
    return a + b;
}

function toUpperCase(str:string): string {
    return str.trim().toUpperCase();
}

//определяем потенциальные вызовы функций
interface MyPosition {
    x: number | undefined;
    y: number | undefined;
}

interface MyPositionWithDefault extends MyPosition {
    default: string;
}

function position(): MyPosition
function position(a: number): MyPositionWithDefault
function position(a: number, b: number): MyPosition

function position(a?: number, b?: number) {
    if(!a && !b) {
        return {x: undefined, y: undefined};
    }
    if(a && !b) {
        return {x: a, y: undefined, default: a.toString()};
    }
    return {x: a, y: b};
}

console.log('Emty', position());
console.log('One param', position(42));
console.log('Two params', position(18, 15));

//============================================
//Классы
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
//=====================================
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

//===========================================
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

//============================================
// Guards 
function strip(x: string | number) {
    if(typeof x === 'number') return x.toFixed(2);
    return x.trim();
}
//instanseof принадлежность объекта к классу
class MyResponse {
    header = 'response header';
    result = 'response result';
}
class MyError {
    header = 'error header';
    message = 'error message';
}
function handle(res: MyResponse | MyError) {
    if(res instanceof MyResponse) {
        return {
            info: res.header + res.result
        }
    } else {
        return {
            info: res.header + res.message
        }
    }
}

//==========================================
type AlertType = 'success' | 'danger' | 'warning';

function setAlertType(type: AlertType) {
    //.....
}

setAlertType('success');
setAlertType('warning');
// setAlertType('default'); // Error

//============================================
//Generic Types
//подстраивается под типы
const arrNum: Array<number> = [1, 1, 2, 3, 5];
const arrStr: Array<string> = ['Hi', 'Bob'];

function reverse<T>(array: T[]): T[] {
    return array.reverse();
}
reverse(arrNum);
reverse(arrStr);

//=====================================
//Операторы
//keyof
interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person; // 'name' | 'age'

let key: PersonKeys = 'name';
key = 'age';
// key = 'job' // Error

//Exclude - исключает 
//Pick - включает
type User = {
    _id: number;
    name: string;
    email: string;
    createdAt: Date;
}

type UserKeysNoMeta = Exclude<keyof User, '_id' | 'createdAt'>; // 'name' | 'email'
type UserKeysWithMeta = Pick<User, '_id' | 'createdAt'>; // '_id' | 'createdAt'

let u1: UserKeysNoMeta = 'name';
// u1 = '_id' // error