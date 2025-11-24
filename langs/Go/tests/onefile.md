### ✅ Как запустить тесты только для одного файла?

Если у вас есть файл `user_repository_test.go` в папке `internal/repository/user/`, вы можете выполнить:

```bash
go test internal/repository/user/user_repository_test.go
```

> ⚠️ Но! **Обычно** тесты находятся **в той же папке**, что и тестируемый код (`user_repository.go` и `user_repository_test.go` в одной директории). Тогда команда проще:

```bash
go test ./internal/repository/user
```

Эта команда запустит **все тесты** в пакете `./internal/repository/user` (все файлы `*_test.go` в этой папке).

---

### ✅ Как запустить конкретную функцию теста?

Если в файле `user_repository_test.go` у вас есть, например:

```go
func TestGetUserByID(t *testing.T) { ... }
func TestCreateUser(t *testing.T) { ... }
```

Вы можете запустить **только** `TestGetUserByID`:

```bash
go test ./internal/repository/user -run TestGetUserByID
```

> 💡 Флаг `-run` принимает **регулярное выражение**. Вы можете использовать `TestGetUser` и он найдёт все тесты, начинающиеся с этого имени.

---

### ✅ Как запустить тесты с подробным выводом?

Добавьте флаг `-v`:

```bash
go test ./internal/repository/user -v
```

---

### ✅ Общая структура команды:

```bash
go test [путь/к/пакету] [флаги]
```

- `[путь/к/пакету]` — путь к директории с тестами (например, `./internal/repository/user`).
- `-run <regexp>` — запустить только тесты, совпадающие с регулярным выражением.
- `-v` — подробный вывод.
- `-race` — проверка гонок (race condition).

---

### ✅ Примеры

1. Запустить все тесты в пакете `user`:
   ```bash
   go test ./internal/repository/user
   ```

2. Запустить только `TestGetUserByID`:
   ```bash
   go test ./internal/repository/user -run TestGetUserByID
   ```

3. Запустить все тесты в пакете с подробным выводом:
   ```bash
   go test ./internal/repository/user -v
   ```

4. Запустить все тесты, подходящие под `TestGetUser`:
   ```bash
   go test ./internal/repository/user -run TestGetUser -v
   ```

---

### 📌 Заключение

Да, вы можете **очень точно указать**, какие тесты запускать, и Go предоставляет удобные флаги для этого. Это особенно полезно при отладке или разработке конкретной функции.
