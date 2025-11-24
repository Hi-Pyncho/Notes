```go
// func generic(val interface{})
func generic(val any) {
  switch val.(type) {
  case int:
    fmt.Println("int")
  case string:
    fmt.Println("string")
  }
}
```
