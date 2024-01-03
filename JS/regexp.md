

```js
const regexp = new RegExp('template', 'flags')
const regexp = /template/;
```


`/./` - любой символ кроме \n

## Символьные классы
`\d` => цифровой символ [0-9]
`\D` => не цифровой символ любой [^0-9]
`\s` => символ пробела (+\t\n\)
`\S` => непробельный символ [^ \r\t\f\n\v]
`\w` => цифры и английские буквы, символ нижнего подчеркивания [A-Za-z0-9_]
`\W` => [^a-zA-Z0-9_], например русская буква, '!$% etc'

## Наборы
`[abc]` - любой символ из набора
`/[ЮИ]ра/` === Юра, Ира

## Исключающие наборы
`[^abc]` - исключающий набор
`/[^ЮИ]ра/` - все кроме букв Ю и И

## Диапазоны
`[a-cd-f]`
`[^a-cd-f]`
это диапазон не букв, а кодов этих символов
`'а'.charCodeAt()` => 1072
`'я'.charCodeAt()` => 1103
`'ё'.charCodeAt()` => 1105 - выходит за диапазон [а-я]

## квантификаторы
`/\d{2}\.\d{2}\.\d{2}/` === `/\d\d\.\d\d\.\d\d/`

## difference/substractions
`--` - перед выражением  
`'Фраза на русском, latin phrase'.match(/[\p{L}]+/vg) // ['Фраза', 'на', 'русском', 'latin', 'phrase']`
`'Фраза на русском, latin phrase'.match(/[\p{L}--\p{Script=Latin}]+/vg) // ['Фраза', 'на', 'русском']`

## intersection
`&&`  
`'Фраза на русском, Latin phrase'.match(/[\p{L}&&\p{Script=Cyrillic}&&\p{Lu}]+/vg) // ['Ф']`

## nested character classes
`'Фраза на русском, Latin phrase'.match(/[[\p{L}&&\p{Script=Cyrillic}]--\p{Ll}]+/vg) // ['Ф']`

## strings in character classes
`\q{}`  
`'Фраза на русском, Latin phrase'.match(/[\q{на|phrase}]+/vg) // ['на', 'phrase']`

## жадные квантификаторы(стараются наибольшее количество раз повторить):
`{n}` - повторить n раз
`/\d{3,4}/` - найти где цифра повторяется от 3 до 4 раз
`{m, n}` => повторить от m до n (жадная)
`{m,}` => жадный, нет верхней от границы, от m и больше
`/colou?r/` => найдет color & colour

`?` => {0,1} квантификатор от 0 до 1
`*` => {0,} от нуля до бесконечности
`+` => {1,} от одного до бесконечности

## ленивые квантификаторы
`{m, n}?` => ленивые квантификаторы(наименьшее)
`{m,}?` => ленивый, 
`*?` => от нуля до нуля
`+?`=> от одного до одного

`/t[a-z]*i/` => 'titani' // Жадный, ищет до последнего i
`/t[a-z]*?i/` => 'ti' // ленивый, ищет до первого i

## Флаги
`g` => С этим флагом поиск ищет все совпадения, без него – только первое.
`s` => Включает режим «dotall», при котором точка . может соответствовать символу перевода строки \n 
`i` => С этим флагом поиск не зависит от регистра: нет разницы между A и a
`m` => Многострочный режим
`y` => для поиска на заданной позиции lastIndex (если находит то останавливается)
`u` => поддержка юникода и юникодных свойств

## [юникодные свойства](https://tc39.es/ecma262/multipage/text-processing.html#table-nonbinary-unicode-properties)
[general category property list](https://unicode.org/reports/tr18/#General_Category_Property)
[property value aliases list](https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)

`/\p{Sc}/gu` => ищет символы валюты. По умолчанию не поддерживаются. поэтому нужно указать флаг u


## якоря
`^` => начало текста (или строки если есть флаг m)
`$` => конец текста (или строки если есть флаг m)
`\b` => якорь границы слова между:
`\B` => не граница слова


> Here is the start,
> and here
> is the end.

`/^[^\s]+/g` => перед скобками - якорь начала текста ('Here')
`/[\s]+$/g` => якорь конца текста ('end')
`/^[^\s]+/gm` => в начале каждой строчке(флаг m)(Here, and, is)
`/[^\s]+$/gm` => в конце каждой строчки('start,', 'here', 'end.')

## пример с якорем \b
```js
let string = 'am .am,..programmer  am   Am'
console.log(string.match(/\bam\b/gi)) 
//["am", "am", "am", "Am"]
console.log(string.match(/\Bam\B/gi))
//["am"] - из слова programmer
```


## Parentheses 
```js
let testStr = "Pumpkin";
let testRegex = /P(engu|umpk)in/;
testRegex.test(testStr);
// Returns true
```

## Reuse Patterns Using Capture Groups
```js
let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/;
repeatRegex.test(repeatStr); // Returns true
repeatStr.match(repeatRegex); // Returns ["regex regex", "regex"]

let testString = "test test test";
let reRegex = /(test)(\s)\1\2\1/;
let result = reRegex.test(testString);
// result will match whole test test test because:
\1 repeats (test)
\2 repeats (\s)
```

## Replace
```js
let str = "one two three";
let fixRegex = /(\w+)\s(\w+)\s(\w+)/; // Change this line
let replaceText = "$3 $2 $1"; // Change this line
let result = str.replace(fixRegex, replaceText); // three two one
```

## скобочные группы
все, что в скобочной группе попадает в результат. чтобы не попадало - (?:)
`()` => скобоыне группы
`(?:)` => скобочная группа исключающая из запоминания
`\N` => обратная ссылка в шаблоне, где N - номер скобочной группы
`'/[a-f\d]{2}([-:])(?:[a-f\d]{2}\1){4}[a-f\d]{2}/gi'`
также можно сослаться на имя скобочной группы
`(?<name>)` - именованная скобочная группа
`(\k<name>)` - обратная ссылка в шаблоне
`'/[a-f\d]{2}(?<separator>[-:])(?:[a-f\d]{2}\k<separator>){4}[a-f\d]{2}/gi'`




## также у regexp есть два метода
`exec(str)` - по очереди вызывает части итератора, если есть флаг _g_
`lastIndex` - на чем итератор остановился

```js
let string = 'Кот терракотового цвета кушает котлету'
let regexp = /кот/gi;

console.log(regexp.exec(string), regexp.lastIndex)
//["Кот", index: 0, input: "Кот терракотового цвета кушает котлету", groups: undefined] 3
console.log(regexp.exec(string), regexp.lastIndex)
//["кот", index: 9, input: "Кот терракотового цвета кушает котлету", groups: undefined] 12
console.log(regexp.exec(string), regexp.lastIndex)
//["кот", index: 31, input: "Кот терракотового цвета кушает котлету", groups: undefined] 34
console.log(regexp.exec(string), regexp.lastIndex)
//null 0
```

чтобы вызвать этот итератор есть matchAll()
но можно и самому
```js
let result = []
let currentResult = null;
while(currentResult = regexp.exec(string)) {
	result = [...result, currentResult]
}
```

## альтернации
`|` = или 
```js
const regexp = /b|d/g
const str = 'abcdef'
console.log(str.match(regexp))
//["b", "d"]

const string = 'Завтрак в 09:15. Обед в 15:45. Ужин в 19:20.'
const regexp = /(?:[01]\d|2[0-3]):[0-5]\d/g
console.log(string.match(regexp))
//["09:15", "15:45", "19:20"]
```

## опережающие и ректроспективные проверки

### позитивная опережающая проверка
`Х(?=Y)` => находит X, если за X следует Y 
```js
const string = 'Ваш заказ 87, с вас 475 рублей... Вот ваша сдача 25 рублей'
const regexp = /\d+\b(?=\sрублей)/g
console.log(string.match(regexp))
//["475", "25"]
```

### негативная опережающая проверка
`X(?!Y)` => найти X, за которым не следует Y
```js
const string = 'Ваш заказ 87, с вас 475 рублей... Вот ваша сдача 25 рублей'
const regexp = /\d+\b(?!\sрублей)/g
console.log(string.match(regexp))
//["87"]
```

### позитивная ретроспективная проверка
`(?<=Y)X` => найти X, если он следует за Y
```js
const string = 'Ваш заказ 87, с вас 475 рублей... Вот ваша сдача 25 рублей'
const regexp = /(?<=заказ\s)\b\d+/g
console.log(string.match(regexp))
//["87"]
```

### негативная ретроспективная проверка
`(?<!Y)X` => найти X, если он не следует за Y
```js
const string = 'Ваш заказ 87, с вас 475 рублей... Вот ваша сдача 25 рублей'
const regexp = /(?<!заказ\s)\b\d+/g
console.log(string.match(regexp))
//["475", "25"]
```

Также опережающая проверка может проверять, даже если X нет
```js
"helloMyNameIsSlimShady".split(/(?=[A-Z])/g)
//["hello", "My", "Name", "Is", "Slim", "Shady"]
```

`(?=)` ищет, начиная с текущей позиции в строке, но по результатам поиска текущую позицию не меняет.
Соответственно, `^` означает, что поиск начинается с начала строки.
И если первый `(?=)` завершается успехом, срабатывает второй `(?=)` - опять с начала строки, а потом и третий - тоже с начала строки.
А после завершения успехом всех трёх `(?=)`, срабатывает - опять же, с начала строки - `[a-zA-Z\d]{6,}$`
  
	