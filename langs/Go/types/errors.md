## Основы: что такое `error` в Go?

- `error` — это **встроенный интерфейс**:
  ```go
  type error interface {
      Error() string
  }
  ```
- Любая функция может **возвращать ошибку** как последнее значение:
  ```go
  func doSomething() (string, error)
  ```

---

## Идиоматичная обработка ошибок

### Обязательная проверка
```go
result, err := someFunc()
if err != nil {
    // обработка ошибки
    return err // или log, или обёртка
}
// продолжаем работу с result
```

> ❌ **Никогда не игнорируйте ошибки** (даже если кажется, что «не может произойти»).

---

## Создание ошибок

### Простые ошибки
```go
import "errors"

err := errors.New("something went wrong")
```

### Форматированные ошибки
```go
import "fmt"

err := fmt.Errorf("failed to open file %q: %w", filename, os.ErrNotExist)
```

> Используйте `%w` для **оборачивания** ошибок (см. ниже).

---

## Оборачивание ошибок (Go 1.13+)

### Зачем?
Чтобы сохранить **оригинальную ошибку** и добавить контекст.

### Как?
```go
if err != nil {
    return fmt.Errorf("cannot process user: %w", err)
}
```

### Проверка с распаковкой
```go
if errors.Is(err, os.ErrNotExist) {
    // обрабатываем конкретную ошибку
}

var pathError *os.PathError
if errors.As(err, &pathError) {
    // извлекаем детали
}
```

> ✅ Используйте `fmt.Errorf("... %w", err)` вместо конкатенации строк.

---

## Что НЕ делать

| Антипаттерн | Почему плохо |
|------------|--------------|
| `log.Print(err); return nil` | Скрывает ошибку от вызывающего кода |
| `if err != nil { panic(err) }` | Паника — только для фатальных ошибок (например, в `main`) |
| Игнорирование ошибки: `_ = f()` | Потеря информации о сбое |
| Возврат `err.Error()` как ошибки | Ломает цепочку ошибок, нельзя использовать `errors.Is/As` |

---

## Ошибки в пакетах: создание собственных типов

Для сложных случаев — определите **собственный тип ошибки**:

```go
type ValidationError struct {
    Field string
    Msg   string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("validation failed for %s: %s", e.Field, e.Msg)
}
```

Теперь можно проверять тип:
```go
if _, ok := err.(ValidationError); ok { ... }
// или лучше:
var ve ValidationError
if errors.As(err, &ve) { ... }
```

```go
type NotFoundError struct {
    Item string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s not found", e.Item)
}

func FindItem(item string) error {
    return &NotFoundError{Item: item}
}

func main() {
    err := FindItem("book")
    if errors.Is(err, &NotFoundError{Item: "book"}) {
        fmt.Println("Book not found!")
    }
}
```

---

## Логирование ошибок

- **Логируйте ошибку там, где вы её окончательно обрабатываете** (обычно на верхнем уровне — в `main` или HTTP-обработчике).
- **Не логируйте и не возвращайте одновременно** — это приводит к дублированию.
- Используйте структурированное логирование (например, `zap`, `log/slog`).

Пример в HTTP-обработчике:
```go
func handler(w http.ResponseWriter, r *http.Request) {
    if err := process(r); err != nil {
        log.Printf("Handler error: %v", err) // логируем
        http.Error(w, "Internal error", http.StatusInternalServerError)
        return // не возвращаем err — он обработан
    }
}
```

---

## Тестирование ошибок

```go
func TestProcess(t *testing.T) {
    _, err := process(invalidInput)
    if err == nil {
        t.Fatal("expected error, got nil")
    }
    if !errors.Is(err, ErrInvalidInput) {
        t.Errorf("unexpected error: %v", err)
    }
}
```

---

## Когда использовать `panic`?

**Почти никогда** в библиотеках.  
Только в **необратимых ситуациях** в `main`:

```go
func main() {
    cfg, err := loadConfig()
    if err != nil {
        panic(fmt.Errorf("critical: cannot load config: %w", err))
    }
    // ...
}
```

> Но даже здесь лучше — `log.Fatal(err)`.

---

## Краткие правила

1. **Всегда проверяйте `err != nil`**.
2. **Оборачивайте ошибки с `%w`**, чтобы сохранить контекст.
3. **Используйте `errors.Is` и `errors.As`** для проверки.
4. **Не паникуйте без крайней необходимости**.
5. **Логируйте ошибку один раз — на границе системы**.
6. **Создавайте осмысленные сообщения**: «что пошло не так» + «почему».

---

## Полезные ссылки

- [`errors` пакет](https://pkg.go.dev/errors)
- [`fmt.Errorf` с `%w`](https://pkg.go.dev/fmt)
- [Go Blog: Working with Errors](https://go.dev/blog/go1.13-errors)

