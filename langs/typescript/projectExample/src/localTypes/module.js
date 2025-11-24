// @ts-check

/**
  * @type {import('./types/module').Test}
*/
export function test(val) {
  console.log(val);
}

/**
  * @type {import('./types/module').GetInfo}
*/
export function getInfo(info) {
  console.log(info);
};

/** @type {Object.<string, number>} */
export const obj = {
  one: 1,
  two: 2,
};

/** @type {Array.<number>} */
export const numArray = [1, 2, 3];

/** @type {[string, string]} */
export const tuple = ['one', 'two'];

/** @type {string | number} */
export const id = '12';

/** @import {CatInterface} from './types/module' */
/** @implements {CatInterface} */
export class Cat {
  /** @param {string} name */
  constructor(name) {
    this.name = name;
  }

  meow() {
    return this.name;
  }
}

/** @enum {number} */
export const nums = {
  one: 1,
  two: 2,
};
