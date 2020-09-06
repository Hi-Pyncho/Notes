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