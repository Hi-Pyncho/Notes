# type

## Extending a type via intersections
```ts
type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
```

## generic
```ts
interface Box<Type> {
  contents: Type;
}

let box: Box<string>;

type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
```

## keyof, pick, exclude
```ts
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
```
