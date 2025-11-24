1.  `db.Query()`: Для запросов, возвращающих строки (например, `SELECT`).
2.  `db.QueryRow()`: Для запросов, возвращающих ровно одну строку (например, `SELECT COUNT(*) ...`).
3.  `db.Exec()`: Для запросов, не возвращающих строки (например, `INSERT`, `UPDATE`, `DELETE`).
4.  `db.Prepare()`: Для подготовки часто используемых запросов с параметрами, что повышает безопасность и производительность.

Вот инструкция с примерами:

### 1. Подготовка: Установление соединения

Как мы уже обсуждали, сначала нужно открыть соединение:

```go
package main

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/denisenkom/go-mssqldb" // Импортируем драйвер
)

func main() {
	connString := "server=localhost;user id=sa;password=yourStrongPassword123;database=your_database_name;"
	db, err := sql.Open("mssql", connString)
	if err != nil {
		log.Fatal("Ошибка при открытии соединения: ", err)
	}
	defer db.Close()

	// Проверяем соединение
	err = db.Ping()
	if err != nil {
		log.Fatal("Ошибка при проверке соединения (ping): ", err)
	}

	fmt.Println("Подключено к базе данных!")

	// Здесь будут вызовы функций для выполнения запросов
	performSelect(db)
	performSelectRow(db)
	performInsert(db)
	performUpdate(db)
	performDelete(db)
	performPrepared(db)
}
```

### 2. Выполнение запроса `SELECT` (`db.Query`)

Используется для получения множества строк.

```go
func performSelect(db *sql.DB) {
	fmt.Println("\n--- Выполнение SELECT ---")
	query := "SELECT TOP 10 id, name FROM users;" // Пример запроса

	rows, err := db.Query(query)
	if err != nil {
		log.Fatal("Ошибка при выполнении запроса SELECT: ", err)
	}
	defer rows.Close() // Обязательно закрываем rows

	// Итерируемся по полученным строкам
	for rows.Next() {
		var id int
		var name string
		err := rows.Scan(&id, &name) // Сканируем значения в переменные
		if err != nil {
			log.Fatal("Ошибка при сканировании строки: ", err)
		}
		fmt.Printf("ID: %d, Name: %s\n", id, name)
	}

	// Проверяем ошибки, которые могли возникнуть при итерации
	if err = rows.Err(); err != nil {
		log.Fatal("Ошибка при итерации по строкам: ", err)
	}
}
```

### 3. Выполнение запроса `SELECT` для одной строки (`db.QueryRow`)

Используется, когда ожидается одна строка.

```go
func performSelectRow(db *sql.DB) {
	fmt.Println("\n--- Выполнение SELECT (одна строка) ---")
	var name string
	idToFind := 1

	// QueryRow возвращает *Row. Вызываем Scan сразу на нём.
	err := db.QueryRow("SELECT name FROM users WHERE id = ?", idToFind).Scan(&name)
	if err != nil {
		if err == sql.ErrNoRows {
			// Обрабатываем случай, когда строка не найдена
			fmt.Println("Пользователь с ID", idToFind, "не найден.")
		} else {
			log.Fatal("Ошибка при выполнении запроса SELECT (одна строка): ", err)
		}
		return
	}
	fmt.Printf("Найдено имя для ID %d: %s\n", idToFind, name)
}
```

### 4. Выполнение запроса `INSERT` (`db.Exec`)

Используется для вставки данных.

```go
func performInsert(db *sql.DB) {
	fmt.Println("\n--- Выполнение INSERT ---")
	query := "INSERT INTO users (name, email) VALUES (?, ?);"
	name := "John Doe"
	email := "john.doe@example.com"

	result, err := db.Exec(query, name, email)
	if err != nil {
		log.Fatal("Ошибка при выполнении запроса INSERT: ", err)
	}

	// Получаем информацию о результате
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Fatal("Ошибка при получении RowsAffected: ", err)
	}
	fmt.Printf("Вставлено строк: %d\n", rowsAffected)

	// Если ваша СУБД поддерживает LastInsertId (SQL Server обычно нет, но MSSQL драйвер может поддерживать через другие методы), вы можете использовать:
	// lastId, err := result.LastInsertId()
	// if err != nil {
	// 	log.Fatal("Ошибка при получении LastInsertId: ", err)
	// }
	// fmt.Printf("ID последней вставленной строки: %d\n", lastId)
}
```

### 5. Выполнение запроса `UPDATE` (`db.Exec`)

Используется для обновления данных.

```go
func performUpdate(db *sql.DB) {
	fmt.Println("\n--- Выполнение UPDATE ---")
	query := "UPDATE users SET email = ? WHERE id = ?;"
	newEmail := "new.email@example.com"
	userID := 999 // Предполагаем, что ID 999 существует

	result, err := db.Exec(query, newEmail, userID)
	if err != nil {
		log.Fatal("Ошибка при выполнении запроса UPDATE: ", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Fatal("Ошибка при получении RowsAffected: ", err)
	}
	fmt.Printf("Обновлено строк: %d\n", rowsAffected)
}
```

### 6. Выполнение запроса `DELETE` (`db.Exec`)

Используется для удаления данных.

```go
func performDelete(db *sql.DB) {
	fmt.Println("\n--- Выполнение DELETE ---")
	query := "DELETE FROM users WHERE id = ?;"
	userIDToDelete := 999 // Предполагаем, что ID 999 существует

	result, err := db.Exec(query, userIDToDelete)
	if err != nil {
		log.Fatal("Ошибка при выполнении запроса DELETE: ", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Fatal("Ошибка при получении RowsAffected: ", err)
	}
	fmt.Printf("Удалено строк: %d\n", rowsAffected)
}
```

### 7. Подготовленные запросы (`db.Prepare`)

Рекомендуется использовать для запросов, которые выполняются несколько раз, особенно с параметрами, чтобы избежать SQL-инъекций и улучшить производительность.

```go
func performPrepared(db *sql.DB) {
	fmt.Println("\n--- Выполнение подготовленного запроса ---")
	// Подготавливаем запрос
	stmt, err := db.Prepare("INSERT INTO users (name, email) VALUES (?, ?);")
	if err != nil {
		log.Fatal("Ошибка при подготовке запроса: ", err)
	}
	defer stmt.Close() // Закрываем подготовленный запрос

	// Используем подготовленный запрос несколько раз
	users := []struct {
		name  string
		email string
	}{
		{"Alice", "alice@example.com"},
		{"Bob", "bob@example.com"},
		{"Charlie", "charlie@example.com"},
	}

	for _, u := range users {
		result, err := stmt.Exec(u.name, u.email)
		if err != nil {
			log.Fatal("Ошибка при выполнении подготовленного запроса: ", err)
		}
		rowsAffected, _ := result.RowsAffected()
		fmt.Printf("Вставлено строк: %d (Name: %s)\n", rowsAffected, u.name)
	}
}
```

**Важно:**

*   Всегда используйте параметры (`?`) в ваших запросах вместо конкатенации строк, чтобы избежать SQL-инъекций.
*   Обязательно вызывайте `rows.Close()` после `db.Query()` и `defer` для этого часто используется.
*   Проверяйте ошибки (`err`) после каждого вызова базы данных.
*   Используйте `sql.ErrNoRows` для проверки случая, когда `QueryRow` не нашел ни одной строки.
*   Не забывайте закрывать подготовленные запросы (`stmt.Close()`).
