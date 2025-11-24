Вызываемый обработчик определяется по максимально совпадающему пути маршрута, но есть одна тонкость. Обратите внимание: в первом `HandleFunc()` указан маршрут `/api` без слеша в конце. Это значит, что запросы `http://localhost:8080/api/` и `http://localhost:8080/api/getid` будет обрабатывать функция `mainPage`. 
Если вместо `/api` указать маршрут `/api/`, то эти запросы придут функции `apiPage()` — из-за последнего слеша этот маршрут будет перехватывать маршруты с префиксом `/api/`. При этом запрос `http://localhost:8080/api` будет перенаправляться на `http://localhost:8080/api/` и тоже обрабатываться функцией apiPage().
```go
import (
  "net/http"
)

func mainPage(res http.ResponseWriter, req *http.Request) {
  if (req.Method != http.MethodGet) {
    http.Error(res, "Only http method GET allowed!", http.StatusMethodNotAllowed)
  }
  res.Write([]byte("main page"))
}

func apiPage(res http.ResponseWriter, req *http.Request) {
  // Многие текстовые сетевые протоколы (в первую очередь HTTP, SMTP, FTP, IRC) требуют, чтобы строки завершались именно последовательностью \r\n, а не просто \n.
	body := fmt.Sprintf("Method: %s\r\n", req.Method)
	body += "Header ===============\r\n"
	for k, v := range req.Header {
		body += fmt.Sprintf("%s: %v\r\n", k, v)
	}
	body += "Query parameters ===============\r\n"
	for k, v := range req.URL.Query() {
		body += fmt.Sprintf("%s: %v\r\n", k, v)
	}
	res.Write([]byte(body))
	res.Write([]byte("api page"))
}

func main() {
  http.HandleFunc("/", mainPage)
  http.HandleFunc("/api", apiPage)

  err := http.ListenAndServe(":8080", nil)

  if (err != nil) {
    panic(err)
  }
}
```

Вместо глобального маршрутизатора лучше использовать локальный, чтобы избежать конфликты маршрутов
- Изолированность: маршруты не смешиваются с другими частями программы или библиотеками.
- Тестируемость: легко передать mux в тесты (httptest.NewServer(mux)).
- Читаемость и явность: сразу видно, какой маршрутизатор используется.
- Безопасность: избегаете побочных эффектов от глобального состояния.

```go
func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/", mainPage)
  mux.HandleFunc("/api/", apiPage)

  fmt.Printf("server started on localhost:%d\n", PORT)

  err := http.ListenAndServe(fmt.Sprintf(":%d", PORT), mux)

  if (err != nil) {
    panic(err)
  }
}
```
