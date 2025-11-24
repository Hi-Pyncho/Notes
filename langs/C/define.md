`#define` определяет символическое имя или символическую константу в виде строки символов
всякий раз, когда в программе встретится определенное таким образом имя, оно будет заменено соответствующим текстом для подстановки

макросы не проверяются компилятором на типы, и могут привести к трудноуловимым ошибкам.

В языке C директива #define — это часть препроцессора, и она используется для: 
- определения макросов
- определения констант
- условной компиляции


```c
#define BUFFER_SIZE 1024
#define PI 3.14159
#define VERSION "1.0.0"

int main() {
  char buffer[BUFFER_SIZE];
  double area = PI * 5 * 5;
  printf("Version: %s\n", VERSION);
  return 0;
}

```

## макросы
```c
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))

int main() {
  int x = 5, y = 10;
  printf("Max: %d\n", MAX(x, y));
  printf("Square of 4: %d\n", SQUARE(4));
  return 0;
}
```

многострочные макросы

```c
#define PRINT_ERROR() do { \
  fprintf(stderr, "Error occurred at %s:%d\n", __FILE__, __LINE__); \
} while(0)

int main() {
  PRINT_ERROR();
  return 1;
}
```

## условная компиляция
```c
#define DEBUG

int main() {
#ifdef DEBUG
  printf("Debug mode enabled\n");
#endif

#ifndef RELEASE
  printf("Not in release mode\n");
#endif

#if defined(DEBUG) && !defined(RELEASE)
  printf("Debug build\n");
#endif
  return 0;
}
```

## удаление макроса
```c
#define VERBOSE

int main() {
#ifdef VERBOSE
  printf("Verbose ON\n");
#endif

#undef VERBOSE

#ifdef VERBOSE
  printf("Still ON\n");
#else
  printf("Now OFF\n");
#endif
  return 0;
}
```

## встроенные макросы
```c
int main() {
  printf("File: %s\n", __FILE__);
  printf("Line: %d\n", __LINE__);
  printf("Function: %s\n", __FUNCTION__); // C99+
  printf("Date: %s\n", __DATE__);
  printf("Time: %s\n", __TIME__);
  return 0;
}
```

## Защита от повторного включения заголовков
Это называется include guard — защищает от повторного включения.

```c
// myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

// содержимое заголовка

#endif // MYHEADER_H
```

## передача агрументами в командной строке

```sh
gcc -DDEBUG=1 -DVERSION=\"2.0\" main.c -o main
```

```c
#if DEBUG
printf("Debug enabled\n");
#endif

printf("Version: %s\n", VERSION);
```
