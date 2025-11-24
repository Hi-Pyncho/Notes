[project-layout-github-repo](https://github.com/golang-standards/project-layout/blob/master/README_ru.md)

blueprint
  - [docs](https://docs.go-blueprint.dev/)
  - [github](https://github.com/Melkeydev/go-blueprint)
  - [site-util](https://go-blueprint.dev/)

Структурирование проекта на Go — это важная практика, особенно для масштабируемых и поддерживаемых приложений. Хотя Go не навязывает жёсткой структуры, с течением времени сформировались **де-факто стандарты**, которые широко используются в сообществе и рекомендуются в официальной документации (например, в [Go Project Layout](https://github.com/golang-standards/project-layout)).

---

### 🏗️ Рекомендуемая структура проекта на Go

```
my-go-project/
├── cmd/                     # Главные исполняемые файлы (бинарники)
│   └── myapp/               # Один бинарник — одна директория
│       └── main.go          # Точка входа приложения
├── internal/                # Код, который НЕ должен использоваться внешними модулями
│   ├── app/                 # Логика приложения (сервисы, бизнес-логика)
│   │   ├── user_service.go
│   │   └── order_service.go
│   ├── handler/             # HTTP-хендлеры (контроллеры)
│   │   ├── user_handler.go
│   │   └── health_handler.go
│   ├── server/              # Инициализация HTTP-сервера
│   │   └── server.go
│   ├── repository/          # Доступ к данным (DAO/Repo)
│   │   ├── user_repository.go
│   │   └── db/              # Конфигурация и инициализация DB
│   │       └── db.go
│   └── config/              # Конфигурация приложения
│       └── config.go
├── pkg/                     # Публичные библиотеки, которые могут быть использованы другими проектами
│   ├── utils/               # Утилиты (например, валидация, хэширование)
│   │   └── validator.go
│   └── logger/              # Кастомный логгер
│       └── logger.go
├── scripts/                 # Скрипты развертывания, миграции, сборки
│   ├── deploy.sh
│   └── migrate_db.sh
├── migrations/              # Миграции базы данных (если используется)
│   ├── 001_create_users_table.sql
│   └── 002_add_email_index.sql
├── config/                  # Конфигурационные файлы (не код!)
│   ├── dev.yaml
│   ├── prod.yaml
│   └── example.yaml
├── tests/                   # Интеграционные и E2E тесты
│   └── integration/
│       └── user_test.go
├── go.mod                   # Модуль Go (зависимости)
├── go.sum                   # Суммы зависимостей
├── .env.example             # Пример переменных окружения
├── .gitignore
├── README.md
└── Dockerfile               # Для контейнеризации
```

---

### 🔍 Подробное объяснение по папкам

#### ✅ `cmd/`
Содержит **точки входа** вашего приложения. Каждый подкаталог — это отдельный бинарник (например, `api-server`, `worker`, `cli-tool`).

**Пример: `cmd/myapp/main.go`**
```go
package main

import (
	"log"
	"my-go-project/internal/server"
)

func main() {
	srv := server.NewServer()
	log.Fatal(srv.ListenAndServe())
}
```

> 💡 *Внешние пользователи не должны импортировать `cmd/` — это только запускаемые программы.*

---

#### ✅ `internal/`
**Самая важная папка.** Здесь находится **весь внутренний код** вашего приложения. Никто вне вашего репозитория не может импортировать пакеты из `internal/` — это гарантирует, что ваша логика не станет публичной зависимостью.

- **`app/`** — бизнес-логика (сервисы): `UserService`, `OrderService`.
- **`handler/`** — HTTP-хендлеры (контроллеры): `HandleGetUser`, `HandleCreateUser`.
- **`server/`** — инициализация HTTP-сервера (gin, echo, net/http).
- **`repository/`** — интерфейсы и реализации доступа к данным (например, к SQL Server).
- **`config/`** — загрузка конфигов из YAML/JSON/ENV.

**Пример: `internal/repository/user_repository.go`**
```go
package repository

import (
	"database/sql"
	"my-go-project/internal/config"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(cfg *config.Config) *UserRepository {
	return &UserRepository{db: cfg.DB}
}

func (r *UserRepository) GetUserByID(id int) (*User, error) {
	var u User
	err := r.db.QueryRow("SELECT id, name, email FROM users WHERE id = ?", id).Scan(&u.ID, &u.Name, &u.Email)
	if err != nil {
		return nil, err
	}
	return &u, nil
}
```

**Пример: `internal/config/config.go`**
```go
package config

import (
	"database/sql"
	_ "github.com/denisenkom/go-mssqldb"
	"os"
)

type Config struct {
	DB *sql.DB
}

func NewConfig() *Config {
	db, err := sql.Open("mssql", os.Getenv("DB_CONN_STRING"))
	if err != nil {
		panic(err)
	}
	return &Config{DB: db}
}
```

---

#### ✅ `pkg/`
Пакеты, которые **могут быть переиспользованы** в других проектах. Например, утилиты, общие библиотеки, клиенты для внешних API.

**Пример: `pkg/utils/validator.go`**
```go
package utils

import "strings"

func IsEmailValid(email string) bool {
	return strings.Contains(email, "@") && strings.Contains(email, ".")
}
```

> ✅ Это можно импортировать в другом проекте: `import "github.com/yourname/my-go-project/pkg/utils"`

---

#### ✅ `migrations/`
Содержит SQL-скрипты для миграций БД (например, `CREATE TABLE`, `ALTER COLUMN`). Используются с инструментами вроде `golang-migrate`.

**Пример: `migrations/001_create_users_table.sql`**
```sql
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL
);
```

---

#### ✅ `config/`
Не код, а **конфигурационные файлы** в формате YAML, JSON, TOML. Полезно для разных окружений (`dev`, `prod`).

**Пример: `config/dev.yaml`**
```yaml
server:
  port: 8080
db:
  conn_string: "server=localhost;user id=sa;password=Pass123!;database=mydb;"
```

---

#### ✅ `scripts/`
Скрипты для автоматизации:
- `deploy.sh` — запуск сборки и деплоя.
- `migrate_db.sh` — запуск миграций.
- `test.sh` — запуск тестов.

**Пример: `scripts/deploy.sh`**
```bash
#!/bin/bash
cd cmd/myapp
go build -o ../myapp-binary
scp myapp-binary user@prod-server:/opt/myapp/
ssh user@prod-server "systemctl restart myapp"
```

---

#### ✅ `tests/`
Интеграционные и E2E тесты. Не путать с unit-тестами, которые обычно рядом с кодом (`*_test.go` внутри `internal/...`).

**Пример: `tests/integration/user_test.go`**
```go
package integration

import (
	"net/http"
	"testing"
)

func TestGetUser(t *testing.T) {
	resp, err := http.Get("http://localhost:8080/users/1")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected 200, got %d", resp.StatusCode)
	}
}
```

---

#### ✅ `.env.example`
Файл с примером переменных окружения для разработчиков.

**Пример: `.env.example`**
```env
DB_CONN_STRING=server=localhost;user id=sa;password=Pass123!;database=mydb;
PORT=8080
ENV=dev
```

---

### ✅ Почему такая структура хороша?

| Преимущество | Объяснение |
|--------------|------------|
| **Чистота** | Код разделён по зонам ответственности: хендлеры ≠ репозитории ≠ сервисы. |
| **Масштабируемость** | Легко добавить новый бинарник (`cmd/worker`) или новую сущность. |
| **Тестируемость** | Легко замокать репозитории в тестах, не трогая сервер. |
| **Безопасность** | `internal/` предотвращает случайный экспорт внутренней логики. |
| **Поддержка** | Все Go-разработчики сразу понимают структуру. |

---

### ⚠️ Что НЕ делать

- Не храните бизнес-логику в `cmd/` — там только `main()`.
- Не кладите `internal/` в `pkg/` — это нарушает смысл разделения.
- Не используйте `main` в `internal/` — он там не нужен.
- Не импортируйте `internal/` из других репозиториев — Go это запрещает.

---

### 💡 Совет для начинающих

Если вы делаете **мини-проект** (например, API с одной моделью), можно начать с упрощённой структуры:

```
myapp/
├── main.go
├── server/
│   └── server.go
├── handler/
│   └── user.go
├── repository/
│   └── user.go
├── config/
│   └── config.go
├── go.mod
└── .env.example
```

По мере роста проекта — **расширяйте структуру**, как описано выше. Это избавит вас от рефакторинга в будущем.

---

Эта структура **стандартна для Go-проектов в продакшене** и используется в компаниях, включая Google, Uber, и многих Open Source-проектах. Она делает ваш код профессиональным, понятным и легко поддерживаемым.
