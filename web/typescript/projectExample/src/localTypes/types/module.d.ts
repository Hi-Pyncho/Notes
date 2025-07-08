export type Test = (val: string) => void;

export type GetInfo = (val: Info) => void;

export type Info = {
  city: string,
  age?: number,
  isAlive: boolean,
};

export interface CatInterface {
  name: string;
  age?: number;
  meow(): string;
  sleep?(): void;
}

export abstract class Meow {
  public makeSound(): string;
  private washing(): void;
}
