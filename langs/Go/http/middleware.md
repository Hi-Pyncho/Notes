## 🧠 Что такое middleware?

**Middleware (промежуточное ПО)** — это функция, которая **оборачивает HTTP-обработчик** и выполняет дополнительную логику **до или после** основного обработчика.

Типичные задачи middleware:
- логирование запросов,
- проверка аутентификации,
- сжатие ответа,
- CORS,
- ограничение скорости (rate limiting),
- восстановление от паник (panic recovery).

---

## 🔧 Как работает middleware в Go?

В основе — **композиция функций**, реализующих интерфейс `http.Handler`.

### Базовый шаблон middleware:
```go
func middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // 1. Логика ДО обработчика
        ...

        // 2. Вызов следующего обработчика
        next.ServeHTTP(w, r)

        // 3. Логика ПОСЛЕ обработчика (редко используется)
        ...
    })
}
```

> ✅ Middleware **принимает `http.Handler` и возвращает `http.Handler`**.

---

## 📌 Пример 1: Логирование запросов

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("→ %s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}
```

Использование:
```go
mux := http.NewServeMux()
mux.HandleFunc("/api", apiHandler)

// Оборачиваем весь маршрутизатор
http.ListenAndServe(":8080", loggingMiddleware(mux))
```

```go
// либо оборачиваем один метод
mux := http.NewServeMux()
mux.Handle("/api/user", logginMiddleware(http.HandlerFunc(addUser)))
http.ListenAndServe(fmt.Sprintf(":%d", PORT), mux)
```

---

## 📌 Пример 2: Восстановление после паники (panic recovery)

```go
func recoverMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                log.Printf("Panic: %v", err)
                http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}
```

> Без этого паника убьёт горутину и соединение зависнет.

---

## 📌 Пример 3: Аутентификация по токену

```go
func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token != "secret-token" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return // не вызываем next!
        }
        next.ServeHTTP(w, r)
    })
}
```

> Если проверка не прошла — **не вызываем `next`**, и цепочка прерывается.

---

## 🧩 Цепочка middleware (композиция)

Middleware можно **накладывать друг на друга**:

```go
handler := loggingMiddleware(
    recoverMiddleware(
        authMiddleware(mux),
    ),
)

http.ListenAndServe(":8080", handler)
```

Или с помощью вспомогательной функции:

```go
func chain(handlers ...func(http.Handler) http.Handler) func(http.Handler) http.Handler {
    return func(h http.Handler) http.Handler {
        for i := len(handlers) - 1; i >= 0; i-- {
            h = handlers[i](h)
        }
        return h
    }
}

// Использование:
app := chain(loggingMiddleware, recoverMiddleware, authMiddleware)(mux)
http.ListenAndServe(":8080", app)
```

> ⚠️ Порядок важен! Например, `recoverMiddleware` должен быть **самым внешним**, чтобы ловить паники из всех внутренних слоёв.

---

## 📦 Пример: Полный сервер с middleware

```go
package main

import (
    "log"
    "net/http"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, world!"))
    })

    // Собираем цепочку
    var handler http.Handler = mux
    handler = loggingMiddleware(handler)
    handler = recoverMiddleware(handler)

    log.Println("Server started on :8080")
    http.ListenAndServe(":8080", handler)
}
```

---

## 🧪 Тестирование middleware

Тестируется как обычный `http.Handler`:

```go
func TestLoggingMiddleware(t *testing.T) {
    called := false
    next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        called = true
    })

    mw := loggingMiddleware(next)
    req := httptest.NewRequest("GET", "/test", nil)
    rec := httptest.NewRecorder()

    mw.ServeHTTP(rec, req)

    if !called {
        t.Error("next handler was not called")
    }
    if rec.Code != http.StatusOK {
        t.Errorf("expected 200, got %d", rec.Code)
    }
}
```

---

## ✅ Лучшие практики

1. **Не модифицируйте `*http.Request` напрямую** — создавайте копию или используйте контекст.
2. **Передавайте данные через `context`**, если нужно передать что-то в обработчик:
   ```go
   ctx := context.WithValue(r.Context(), "userID", 123)
   next.ServeHTTP(w, r.WithContext(ctx))
   ```
3. **Используйте явный `ServeMux`**, а не глобальный.
4. **Пишите middleware как чистые функции** — без глобального состояния.
5. **Порядок middleware важен**: сначала recovery, потом auth, потом логирование и т.д.
