# Pointers

a pointer is just a variable that stores a memory address

```c
int age = 37;
int *pointerToThing;
int *agePointer = &age;

printf("The address of age is: %p\n", agePointer); // 0xff0f0df...
printf("The address of thing is: %p\n", pointerToThing); // nil
printf("The value of age is: %d\n", *agePointer); // 37

*agePointer = 42; // change value

printf("The value of age is: %d\n", *agePointer); // 42
return 0;

```

```c
// h file
typedef struct CodeFile {
  int lines;
  int filetype;
} codefile_t;

codefile_t change_filetype(codefile_t *f, int new_filetype);

// c file
typedef struct CodeFile {
  int lines;
  int filetype;
} codefile_t;

codefile_t change_filetype(codefile_t *f, int new_filetype){
  codefile_t newCopy = *f; // создает копию
  codefile_t *pointer = f; // создает указатель на оригинальный объект
  f->filetype = new_filetype; // меняет оригинальный объект

  return newCopy;
}

codefile_t c = {
  .lines = 2,
  .filetype = 3,
};

codefile_t f = change_filetype2(&c, 4);
```

## арифметика указателей
Арифметика указателей — это возможность выполнять математические операции (сложение, вычитание, инкремент, декремент) над указателями для перемещения по памяти. Это одна из ключевых особенностей языка C, позволяющая эффективно работать с массивами, строками и динамическими структурами данных.

```c
int arr[3] = {10, 20, 30};
int *ptr = arr;  // ptr указывает на arr[0]

ptr++;  // Теперь ptr указывает на arr[1] (адрес увеличился на sizeof(int))
printf("%d", *ptr); // 20

int *ptr2 = arr + 2;  // ptr2 указывает на arr[2]
printf("%d", *ptr2);  // 30

ptr2 -= 1;  // Теперь ptr2 указывает на arr[1]
printf("%d", *ptr2);  // 20

int *ptr1 = &arr[0];
int *ptr2 = &arr[2];
printf("%ld", ptr2 - ptr1);  // 2 (элемента)
```

Указатели перемещаются не на 1 байт, а на размер типа:

`char*` → шаг 1 байт (sizeof(char) = 1).

`int*` → шаг 4 байта (если sizeof(int) = 4).

`double*` → шаг 8 байт (если sizeof(double) = 8).

Итерация по массивам без индексов
```c
int arr[5] = {1, 2, 3, 4, 5};
for (int *p = arr; p < arr + 5; p++) {
  printf("%d ", *p);  // 1 2 3 4 5
}
```

Доступ к элементам структур
```c
struct Point { int x; int y; } points[3];
struct Point *ptr = points;
ptr->x = 10;  // points[0].x = 10
(ptr + 1)->y = 20;  // points[1].y = 20
```

Пример: Поиск длины строки
```c
size_t strlen(const char *s) {
  const char *p = s;
  while (*p != '\0') p++;
  return p - s;  // Разница между указателями = длина строки
}
```

## разница элементов и байт

```c
int diff = &numbers[4] - &numbers[0]; // количество элементов
long offset = (char *)&numbers[4] - (char *)&numbers[0]; // количество байт
long offset2 = diff * sizeof(int); // количество байт

printf("%zu\n", offset); // 16
printf("%zu\n", offset2); // 16
printf("%d\n", diff); // 4
```
