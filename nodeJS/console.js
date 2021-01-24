//Взаимодействие с консолью
// console.log(process.argv);
function consoleToJSON() {
  const consoleObj = {};

  for(let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i].split('=');
    // по конвенции если передан один аргумент, без значения
    // то тогда это булево значение
    consoleObj[arg[0]] = arg[1] ? arg[1] : true;
  }

  return consoleObj;
}
// node test.js message=hello spec
// ==> { message: 'hello', spec: true }
console.log(consoleToJSON())