
## встроенные макросы

| Макрос | Описание |
|--------|--------|
| `__FILE__` | Имя текущего файла (строка) |
| `__LINE__` | Номер текущей строки |
| `__func__` | Имя текущей функции |
| `__DATE__` | Дата компиляции (в формате `"Mmm DD YYYY"`) |
| `__TIME__` | Время компиляции (`"HH:MM:SS"`) |

---

```c
#define LOG(fmt, ...) \
    fprintf(stderr, "[LOG] %s:%d: " fmt "\n", __FILE__, __LINE__, __VA_ARGS__)
```

Использование:
```c
LOG("Ошибка: %s, код %d", "file not found", 404);
// Вывод: [LOG] main.c:42: Ошибка: file not found, код 404
```

---

## 🔧 Практические примеры использования

### ✅ 1. Универсальный отладочный макрос

```c
#ifdef DEBUG
#define DBG(fmt, ...) \
    fprintf(stderr, "DEBUG %s:%d %s(): " fmt "\n", \
            __FILE__, __LINE__, __func__, ##__VA_ARGS__)
#else
#define DBG(fmt, ...) /* пусто */
#endif
```

> `##__VA_ARGS__` — убирает запятую, если аргументов нет.

---

### ✅ 3. Логирование с уровнем

```c
#define ERROR(fmt, ...) LOG("ERROR", fmt, ##__VA_ARGS__)
#define INFO(fmt, ...)  LOG("INFO",  fmt, ##__VA_ARGS__)

#define LOG(level, fmt, ...) \
    fprintf(stderr, "[%s] %s:%d: " fmt "\n", level, __FILE__, __LINE__, ##__VA_ARGS__)
```
