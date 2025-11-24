В Go работа с локальными файлами на HTTP-сервере обычно реализуется с помощью пакета `net/http`. Основные сценарии:

---

### 1. **Раздача статических файлов (например, HTML, CSS, JS, изображений)**

Используется функция [`http.FileServer`](https://pkg.go.dev/net/http#FileServer) в связке с [`http.StripPrefix`](https://pkg.go.dev/net/http#StripPrefix):

```go
package main

import (
    "net/http"
)

func main() {
    fs := http.FileServer(http.Dir("./static/"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    http.ListenAndServe(":8080", nil)
}
```

Теперь файл `./static/style.css` (и вложенные файлы и папки в `/static/**/*`) будет доступен по адресу `http://localhost:8080/static/style.css`.

> **Важно:** `http.Dir` не выходит за пределы указанной директории по соображениям безопасности.

Можно определять несколько обработчиков `FileServer()` для разных директорий. Если при определённом запросе нужно вернуть содержимое конкретного файла, стоит использовать функцию `ServeFile(w ResponseWriter, r *Request, name string)`.
```go
http.HandleFunc("/favicon.ico", func(w http.ResponseWriter, r *http.Request){
   http.ServeFile(w, r, "./public/favicon.ico")
})
```

---

### 2. **Чтение конкретного файла и отправка его содержимого вручную**

Если нужно, например, отдать файл с кастомными заголовками или обработать его перед отправкой:

```go
http.HandleFunc("/download", func(w http.ResponseWriter, r *http.Request) {
    data, err := os.ReadFile("./files/document.pdf")
    if err != nil {
        http.Error(w, "File not found", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "application/pdf")
    w.Header().Set("Content-Disposition", `attachment; filename="document.pdf"`)
    w.Write(data)
})
```

---

### 3. **Загрузка файлов (multipart/form-data)**

Для приёма файлов от клиента:

```go
http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
        return
    }

    file, header, err := r.FormFile("file")
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    defer file.Close()

    dst, err := os.Create("./uploads/" + header.Filename)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer dst.Close()

    _, err = io.Copy(dst, file)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Write([]byte("Upload successful"))
})
```

HTML-форма для этого:
```html
<form method="post" enctype="multipart/form-data">
  <input type="file" name="file">
  <button type="submit">Upload</button>
</form>
```

---

### Безопасность

- Никогда не используйте пользовательский ввод напрямую в путях к файлам (`http.Dir`, `os.Open` и т.д.), чтобы избежать Directory Traversal (например, `../../../etc/passwd`).
- Всегда проверяйте расширения, размер и тип файлов при загрузке.
- Используйте `filepath.Clean` и проверки на префиксы, если строите пути динамически.
