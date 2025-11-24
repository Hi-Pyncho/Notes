
### 🔹 Определение  
`map` — встроенный тип в Go, реализующий ассоциативный массив (хеш-таблицу):  
```go
map[KeyType]ValueType
```
- **Ключи** должны быть *сравнимыми* (`int`, `string`, структуры без срезов/мап и т.п.).
- **Значения** — любого типа.

---

### 🔹 Создание
```go
// Через make (рекомендуется для пустых)
m := make(map[string]int)

// С инициализацией
m := map[string]int{"a": 1, "b": 2}

// Нулевое значение — nil (нельзя писать/читать без make)

// При объявлении карта равна nil.
var ages map[string]int
fmt.Println(ages == nil) // => true
```

---

### 🔹 Основные операции
- **Чтение**:  
  ```go
  v, ok := m["key"]  // ok == false, если ключа нет
  ```
- **Запись**:  
  ```go
  m["key"] = value
  ```
- **Удаление**:  
  ```go
  delete(m, "key")
  ```
- проверка размера
```go
len(map)
```
---

### Нельзя взять адрес значения из мапы
Получить адрес элемента map не получится. Это связано с тем, что при добавлении новых элементов в мапу может произойти перемещение в памяти уже существующих элементов. Указатели на эти элементы станут недействительными. Поэтому такая операция запрещена.
```go
addr := &m[k] // cannot take the address of m[k] 
```

---

### Проверка существования ключа
```go
age, exists := ages["Charlie"]
fmt.Println(age, exists) // => 0 false

```

---

### 🔹 Особенности
- **Неупорядочен**: порядок итерации `for k := range m` случаен.
- **Потоконебезопасен**: конкурентный доступ → data race.
- **Нельзя сравнивать** (кроме с `nil`). Для сравнения содержимого — использовать `maps.Equal`.

---

### 🔹 Конкурентность
Для безопасного доступа из нескольких горутин:
- Используй `sync.Mutex` + обычная `map`, **или**
- Используй `sync.Map` (оптимизирован для редких записей / частых чтений):
  ```go
  var m sync.Map
  m.Store("k", 1)
  m.Load("k")
  ```

---

### 🔹 Утилиты (Go ≥1.18, generics)
Пакет [`maps`](https://pkg.go.dev/golang.org/x/exp/maps) (или стандартный `maps` в будущих версиях):
```go
import "golang.org/x/exp/maps"

keys := maps.Keys(m)
values := maps.Values(m)
copy := maps.Clone(m)
ok := maps.Equal(m1, m2)
```

---

### 🔹 Синтаксис
Используется ключевое слово `range`:
```go
for key, value := range myMap {
    // тело цикла
}
```

---

### 🔹 Варианты использования

1. **Ключ и значение**:
 ```go
 for k, v := range m {
     fmt.Println(k, v)
 }
 ```

2. **Только ключ**:
 ```go
 for k := range m {
     fmt.Println(k)
 }
 ```

3. **Только значение** (ключ игнорируется):
 ```go
 for _, v := range m {
     fmt.Println(v)
 }
   ```

> ⚠️ Если не используешь одну из переменных — обязательно ставь `_`, иначе будет ошибка компиляции.

---

### Пример с сортировкой ключей
```go
import "slices"

ages := map[string]int{
    "Alice": 25,
    "Bob":   30,
    "Tom":   19,
}

keys := []string{}
for name := range ages {
    keys = append(keys, name)
}
slices.Sort(keys)

for _, name := range keys {
    fmt.Printf("%s is %d years old\n", name, ages[name])
}

// => Alice is 25 years old
// => Bob is 30 years old
// => Tom is 19 years old

```

---

### Преобразование карты в срез пар
```go
import "slices"

type Person struct {
    Name string
    Age  int
}

var people []Person
for name, age := range ages {
    people = append(people, Person{Name: name, Age: age})
}

// Теперь people можно отсортировать по возрасту:
slices.SortFunc(people, func(a, b Person) int {
    return a.Age - b.Age
})
```

### 🔹 Особенности

- **Порядок итерации не гарантирован** — каждый запуск может давать разный порядок.
  - Это сделано намеренно, чтобы избежать зависимости от порядка.
- **Изменение map во время итерации допустимо**, но:
  - Добавление/удаление элементов **не влияет на текущую итерацию** (может не отразиться в этом цикле).
  - Удалённые элементы **не будут посещены**, даже если ещё не достигнуты.
- **Копирование не происходит** — `range` работает с оригинальной картой.

---

### 🔹 Пример
```go
m := map[string]int{"a": 1, "b": 2, "c": 3}

for k, v := range m {
    if v == 2 {
        delete(m, k) // безопасно, но "b" может уже пройти или нет
    }
    fmt.Println(k, v)
}
```

### Вложенные map
Вложенные карты (map внутри map) используются, когда нужно хранить данные с двумя уровнями ключей. Например, если у нас есть пользователи, и у каждого из них есть набор настроек, можно использовать карту вида: map[string]map[string]string.
```go
settings := map[string]map[string]string{
    "alice": {
        "theme":"dark",
        "lang": "en",
    },
    "bob": {
        "theme":"light",
        "lang": "fr",
    },
}

fmt.Println(settings["alice"]["theme"]) // => dark

// не копируется по значению, меняется напрямую

part := settings["alice"]
part["theme"] = "light"
fmt.Println(settings["alice"]["theme"]) // => light
```
### Добавление элементов

Вот так будет выглядеть добавление вложенной карты:
```go
settings["charlie"] = map[string]string{
    "theme": "dark",
    "lang":  "es",
}
```

Чтобы добавить или изменить конкретную настройку у существующего пользователя:
```go
settings["alice"]["lang"] = "ru"
fmt.Println(settings["alice"]) // => map[lang:ru theme:dark]
```

### Инициализация вложенной карты

Если вложенная карта для пользователя ещё не создана, при обращении к ней будет возвращён nil. Перед изменением такой карты её нужно инициализировать:
```go
user := "david"

fmt.Println(settings[user] == nil) // => true

  if settings[user] == nil {
    settings[user] = make(map[string]string)
  }
settings[user]["theme"] = "light"

fmt.Println(settings[user] == nil) // => false
```

### Удаление элементов

Удаление вложенного элемента карты можно выполнить с delete():

Удалить одну настройку пользователя:

```go
delete(settings["bob"], "lang")
```

Удалить все настройки пользователя:

```go
delete(settings, "alice")
```

### Перебор вложенных карт

Можно пройтись по всем пользователям и их настройкам:
```go
settings := map[string]map[string]string{
  "alice": {
    "theme": "dark",
      "lang":  "en",
  },
    "bob": {
      "theme": "light",
      "lang":  "fr",
    },
}

for user, userSettings := range settings {
  fmt.Printf("User: %s\n", user)
    for key, value := range userSettings {
      fmt.Printf("  %s = %s\n", key, value)
    }
}
```

---

### Полезные приёмы работы с картами
[samber/lo](https://github.com/samber/lo)

### Инкремент значений (счётчики)

Карты отлично подходят для подсчёта чего-либо. Если ключ отсутствует, доступ map[key] возвращает нулевое значение:

```go
words := map[string]int{}
words["go"]++
words["go"]++

fmt.Println(words["go"]) // => 2
```


### Установка значения по умолчанию

С помощью `lo.GetOrElse()` можно задать значение по умолчанию, если ключ отсутствует:

```go
import "github.com/samber/lo"

defaults := map[string]string{
  "theme": "light",
}

lang := lo.GetOrElse(defaults, "lang", "en")
fmt.Println(lang) // => en
```

### Сбор ключей или значений

Чтобы получить список всех ключей карты, используйте maps.Keys():

```go
import "maps"

keys := maps.Keys(users)
fmt.Println(keys) // => [alice bob]

```

### Чтобы собрать значения:

```go
import (
  "fmt"
  "maps"
)

values := maps.Values(users)
fmt.Println(values) // => [25 30]
```

### Если нужно отсортировать ключи:

```go
import (
  "fmt"
  "slices"
  "maps"
)

keys := maps.Keys(users)
slices.Sort(keys)
fmt.Println(keys) // => [alice bob]

```

### Вложенные карты (инициализация на лету)

Когда значение карты само является картой, полезен следующий паттерн:

```go
settings := map[string]map[string]string{}

user := "alice"
if settings[user] == nil {
  settings[user] = make(map[string]string)
}

settings[user]["theme"] = "dark"
```

При первом обращении к settings["alice"], если такого ключа ещё нет, Go вернёт nil, но не ошибку. Однако если мы попытаемся сразу обратиться к settings["alice"]["theme"], не проверяя, инициализирована ли внутренняя карта, будет паника времени выполнения.

Этот шаблон — инициализация на лету: если для ключа ещё нет вложенной карты, она создаётся сразу перед использованием.

---

### 🔹 Производительность
- Итерация по `map` — **O(n)**.
- Нет способа ускорить обход — только стандартный `range`.

---

### 🔹 Советы
- Предварительно задавай ёмкость: `make(map[K]V, size)` — уменьшает реаллокации.
- Избегай `map` с изменяемыми/неподходящими ключами (`slice`, `map`, `func` — запрещены).
- Для кэшей или упорядоченных данных — смотри в сторону сторонних библиотек (`go-cache`, `golang-lru` и др.).

--- 

✅ **Идеально подходит для**: конфигураций, кэширования, группировки данных, подсчёта частот.
