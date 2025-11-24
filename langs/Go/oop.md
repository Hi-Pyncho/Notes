
```go
type MyFloat float64

func (f MyFloat) Abs ( ) float64 {
  if f < 0 {
    return float64(-f)
  }

  return float64(f)
}

func main() {
  f := MyFloat(-math.Sqrt2)
  fmt.Println(f.Abs())
}
```

```go
type Vertex struct { Y, X float64 }

func (v *Vertex) Scale(f float64) {
  v.X *= f
  v.Y *= f
}

func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X * v.X + v.Y * v.Y)
}

func main() {
  v := &Vertex{3, 4}
  v.Scale(5)

  fmt.Println(v.Abs())
}
```
