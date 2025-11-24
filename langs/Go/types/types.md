
```go
type position float64
type velocity float64

var pos position = 218.0
var vel velocity = -8.12

// pos += vel // INVALID: mismatched types position and velocity

pos += position(vel)
```

Чтобы привести один тип к другому, в Go используется такой синтаксис: `type(variable)`
```go
type Name string
type Fruit string

var fruit Fruit
var name Name

fruit = "Apple"
name = Name(fruit)
```
