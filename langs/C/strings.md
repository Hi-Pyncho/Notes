C strings are:
- How we represent text in C programs
- Any number of characters (chars) terminated by a null character ('\0').
- A pointer to the first element of a character array.

It's important to understand that most string manipulation in C is done using pointers to move around the array and the null terminator is critical for determining the end of the string. In the example above, the string "ssh terminal.shop for the best coffee" is stored in memory as an array of characters, and the null terminator '\0' is automatically added at the end.

- Unlike other programming languages, C strings do not store their length.
- The length of a C string is determined by the position of the null terminator ('\0').
- Functions like `strlen` calculate the length of a string by iterating through the characters until the null terminator is encountered.
- This lack of length storage requires careful management to avoid issues such as buffer overflows and off-by-one errors during string operations.

You can declare strings in C using either arrays or pointers:
```c
char str1[] = "Hi";
char *str2 = "Snek";
printf("%s %s\n", str1, str2);
// Output: Hi Snek
```
```c
// notice we aren't using all 50 characters
char first[50] = "Snek";
char *second = "lang!";
strcat(first, second);
printf("Hello, %s\n", first);
// Output: Hello, Sneklang!

```
The `strcat` function appends its second argument to the first argument. In this case, it appends "lang!" to "Snek", resulting in the output Hello, Sneklang!.

Here's what first might look like in memory:
NOTE! There is a bunch of garbage memory after the end of the string.

| Позиция | 1      | 2      | 3      | 4      | 5      | 6      | 7    | 8      |
|---------|--------|--------|--------|--------|--------|--------|------|--------|
| Символ  | 'S'    | 'n'    | 'e'    | 'k'    | '\0'   | ????   | ...  | ????   |
| Код     | 0x3000 | 0x3001 | 0x3002 | 0x3003 | 0x3004 | 0x3005 | ...  | 0x3031 |

Here's what second might look like in memory:

| Позиция | 1      | 2      | 3      | 4      | 5      | 6      |
|---------|--------|--------|--------|--------|--------|--------|
| Символ  | 'l'    | 'a'    | 'n'    | 'g'    | '!'    | '\0'   |
| Код     | 0x4000 | 0x4001 | 0x4002 | 0x4003 | 0x4004 | 0x4005 |

And first after strcat:

| Позиция | 1      | 2      | 3      | 4      | 5      | 6      | 7      | 8      | 9      | 10     | 11     | 12   | 13     |
|---------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|------|--------|
| Символ  | 'S'    | 'n'    | 'e'    | 'k'    | 'l'    | 'a'    | 'n'    | 'g'    | '!'    | '\0'   | ????   | ...  | ????   |
| Код     | 0x3000 | 0x3001 | 0x3002 | 0x3003 | 0x3004 | 0x3005 | 0x3006 | 0x3007 | 0x3008 | 0x3009 | 0x300A | ...  | 0x3031 |

The strcat function appends the string "lang!" to the end of the string "Snek", but smartly uses the null terminator to know where to start appending. It doesn't know the length of the string, but it knows where it ends.

## Как указатель и как массив
### как указатель
```c
char *world = "123";  // указатель на строковый литерал
```
Особенности:
- Располагается в сегменте данных (read-only память)
- Нельзя изменять содержимое: world[0] = 'a'; → undefined behavior
- Можно переназначать указатель: world = "new";
- Размер определяется автоматически (+1 для \0)
- sizeof(world) вернет размер указателя (4 или 8 байтов)

### как массив
```c
char world[10] = "123";  // массив с инициализацией
```
Особенности:
- Располагается в стеке (или в статической памяти, если global)
- Можно изменять содержимое: world[0] = 'a'; ✓
- Нельзя переназначать массив: world = "new"; → ошибка
- Фиксированный размер (10 байтов), даже если строка короче
- sizeof(world) вернет 10 (размер массива)

| Характеристика | `char *world = "123"` | `char world[10] = "123"` |
|----------------|----------------------|--------------------------|
| **Тип** | Указатель | Массив |
| **Память** | Read-only сегмент | Стек/статика |
| **Изменяемость** | Только для чтения | Изменяема |
| **Переназначение** | `world = "new"` ✓ | `world = "new"` ❌ |
| **Размер** | `sizeof(world)` = размер указателя | `sizeof(world)` = 10 |
| **`world[0] = 'a'`** | Undefined behavior | Корректно |
| **Где хранится** | `.rodata` сегмент | Локальная переменная |

## null оператор \0 (нуль-терминат)
В C строки обязательно должны заканчиваться нуль-терминатором (\0), потому что:

1. Определение конца строки

C не хранит длину строки явно. Функции работают со строками до тех пор, пока не встретят \0.

```c
char str[] = "Hello"; // На самом деле: {'H','e','l','l','o','\0'}
// Без \0 функции не знают, где конец строки
```

2. Безопасность

Без \0 функции могут читать/писать за пределами выделенной памяти:

- printf("%s", dest) будет выводить мусор до случайного нулевого байта
- strlen(dest) вернет непредсказуемое значение
- strcat(dest, "lo") может повредить память

```c
char buffer[5] = {'H','e','l','l','o'}; // НЕТ \0!
printf("%s", buffer); // Читает пока не найдет \0 → возможен segfault
```

3. Правильная работа функций

Все стандартные строковые функции ожидают \0:

|Функция|Поведение без \0|
|-|-|
|strlen()|Считает до случайного \0 → неверный результат|
|strcpy()|Копирует пока не найдет \0 → переполнение буфера|
|printf("%s")|Печатает пока не найдет \0 → мусор или crash|

Альтернативные способы гарантировать \0:
```c
// Способ 1: Инициализация нулями
char dest[6] = {0};      // Весь массив заполнен \0
strncpy(dest, src, 3);   // \0 остался на позиции 3

// Способ 2: Использование strlcpy (если доступна)
strlcpy(dest, src, sizeof(dest)); // Сама добавляет \0

// Способ 3: snprintf
snprintf(dest, sizeof(dest), "%.3s", src); // Безопасно
```

## UTF-8
![2025-10-04-12-22-14](img/2025-10-04-12-22-14.png)
![2025-10-04-14-10-33](img/2025-10-04-14-10-33.png)
![2025-10-04-14-10-58](img/2025-10-04-14-10-58.png)
![2025-10-04-14-11-14](img/2025-10-04-14-11-14.png)
![2025-10-04-14-11-30](img/2025-10-04-14-11-30.png)

## string library
The C standard library provides a comprehensive set of functions to manipulate strings in the <string.h> header file. Here are some of the most commonly used functions:

`strcpy`: Copies a string to another.

```c
char src[] = "Hello";
char dest[6];
strcpy(dest, src);
// dest now contains "Hello"
```

`strcat`: Concatenates (appends) one string to another.

```c
char dest[12] = "Hello";
char src[] = " World";
strcat(dest, src);
// dest now contains "Hello World"
```

`strlen`: Returns the length of a string (excluding the null terminator).

```c
char str[] = "Hello";
size_t len = strlen(str);
// len is 5
```

`strcmp`: Compares two strings lexicographically.

```c
char str1[] = "Hello";
char str2[] = "World";
int result = strcmp(str1, str2);
// result is negative since "Hello" < "World"
```

`strncpy`: Copies a specified number of characters from one string to another.

```c
char src[] = "Hello";
char dest[6];
strncpy(dest, src, 3);
// dest now contains "Hel"
dest[3] = '\0';
// ensure null termination
```

`strncat`: Concatenates a specified number of characters from one string to another.

```c
char dest[12] = "Hello";
char src[] = " World";
strncat(dest, src, 3);
// dest now contains "Hello Wo"
```

`strchr`: Finds the first occurrence of a character in a string.

```c
char str[] = "Hello";
char *pos = strchr(str, 'l');
// pos points to the first 'l' in "Hello"
```

`strstr`: Finds the first occurrence of a substring in a string.

```c
char str[] = "Hello World";
char *pos = strstr(str, "World");
// pos points to "World" in "Hello World"
```
