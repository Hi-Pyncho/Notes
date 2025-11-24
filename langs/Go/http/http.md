## 🧱 1. Базовые понятия

- **`http.Handler`** — интерфейс:
  ```go
  type Handler interface {
      ServeHTTP(w http.ResponseWriter, r *http.Request)
  }
  ```
- **`http.HandlerFunc`** — тип-обёртка для функций с сигнатурой:
  ```go
  func(w http.ResponseWriter, r *http.Request)
  ```
  Такие функции автоматически реализуют `http.Handler`.

---

## 🚀 2. Простейший сервер

```go
package main

import (
    "fmt"
    "net/http"
)

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello, world!")
}

func main() {
    http.HandleFunc("/", home)               // регистрирует обработчик в глобальном маршрутизаторе
    fmt.Println("Server started on :8080")
    http.ListenAndServe(":8080", nil)        // nil → использует DefaultServeMux
}
```

> ⚠️ Не рекомендуется для продакшена — используйте явный `ServeMux`.

---

## 🔧 3. Явный маршрутизатор (лучшая практика)

```go
mux := http.NewServeMux()
mux.HandleFunc("/", home)
mux.HandleFunc("/api", api)

fmt.Println("Server started on :8080")
http.ListenAndServe(":8080", mux)  // передаём свой маршрутизатор
```

✅ Преимущества: изоляция, тестируемость, отсутствие глобального состояния.

---

## 📥 4. Чтение данных из запроса

### Метод и URL
```go
method := r.Method
path := r.URL.Path
query := r.URL.Query().Get("key")
```

### Заголовки
```go
userAgent := r.Header.Get("User-Agent")
```

### Тело запроса (например, JSON)
```go
body, err := io.ReadAll(r.Body)
if err != nil {
    http.Error(w, "Bad request", http.StatusBadRequest)
    return
}
defer r.Body.Close()
```

> Не забывайте `defer r.Body.Close()`!

### Форма (application/x-www-form-urlencoded)
```go
if err := r.ParseForm(); err != nil {
    http.Error(w, "Bad form", http.StatusBadRequest)
    return
}
value := r.FormValue("field_name")
```

### JSON в теле → структура
```go
var input struct {
    Name string `json:"name"`
}
if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
    http.Error(w, "Invalid JSON", http.StatusBadRequest)
    return
}
```

---

## 📤 5. Отправка ответа

### Простой текст
```go
w.Write([]byte("OK"))
// или
fmt.Fprint(w, "Hello")
```

### Установка статуса
```go
w.WriteHeader(http.StatusCreated)  // по умолчанию 200
w.Write([]byte("Created"))
```

### JSON-ответ
```go
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
```

### Ошибки
```go
http.Error(w, "Not found", http.StatusNotFound)
// эквивалентно:
// w.WriteHeader(http.StatusNotFound)
// w.Write([]byte("Not found"))
```

---

## 🛡️ 6. Middleware (пример)

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("Request: %s %s\n", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

// Использование:
mux := http.NewServeMux()
mux.HandleFunc("/api", api)
http.ListenAndServe(":8080", loggingMiddleware(mux))
```

---

## 🧪 7. Тестирование

```go
func TestHome(t *testing.T) {
    req := httptest.NewRequest("GET", "/", nil)
    w := httptest.NewRecorder()
    home(w, req)
    assert.Equal(t, http.StatusOK, w.Code)
    assert.Contains(t, w.Body.String(), "Hello")
}
```

## Вспомогательные функции
Для решения типовых задач при написании обработчиков используют вспомогательные функции `http.Error()`, `http.NotFound()`, `http.Redirect()` из пакета `net/http`. Функцию `Redirect(w ResponseWriter, r *Request, url string, code int)` можно использовать для перенаправления следующим образом:
```go
func redirect(w http.ResponseWriter, r *http.Request) {
    http.Redirect(w, r, "https://example.com/", http.StatusMovedPermanently)
}

func main() {
    http.HandleFunc("/search/", redirect)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```
Также есть несколько функций, которые возвращают готовый `http.Handler`:
- `RedirectHandler(url string, code int) Handler`
- `NotFoundHandler() Handler`
- `TimeoutHandler(h Handler, dt time.Duration, msg string) Handler`

---

## ✅ Рекомендации

- Всегда используйте **явный `*http.ServeMux`**, а не глобальный.
- Всегда проверяйте ошибки при чтении тела (`r.Body`).
- Устанавливайте `Content-Type` явно при отправке JSON/XML.
- Для сложных маршрутов рассмотрите роутеры вроде `gorilla/mux` или `chi`, но для простых случаев `net/http` достаточно.
- Логируйте ошибки, но не отправляйте внутренние детали клиенту в продакшене.

---

## 📦 Полный пример (REST-like)

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func greet(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" {
        name = "Guest"
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"message": "Hello, " + name})
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/greet", greet)

    fmt.Println("Server running on :8080")
    http.ListenAndServe(":8080", mux)
}
```

---

Готово! Теперь вы можете уверенно обрабатывать HTTP-запросы в Go. 🚀
