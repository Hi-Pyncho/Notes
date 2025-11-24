```go
import (
  "bufio"
  "os"
)

func main() {
  scanner := bufio.NewScanner(os.Stdin)

  for scanner.Scan() {
    line := scanner.Text()

    if len(line) == 0 { break }

    println(line)
  }
}
```

```go
import (
  "strings"
	"bufio"
	"io"
	"os"
)

func main() {
  reader := bufio.NewReader(os.Stdin)

  for {
    line, err := reader.ReadString('\n')

    if err == io.EOF {
      println()
      break
    }

    line = strings.TrimRight(line, " \n")

    if len(line) == 0 { break }

    println(line)
  }
}
```

```go
import (
  "flag"
	"os"
)

var omitNewLine = flag.Bool("n", false, "не печатать знак новой строки")

const (
  Space = " "
  NewLine = "\n"
)

func main() {
  flag.Parse()

  var s string

  for i := range flag.NArg() {
    s += flag.Arg(i) + Space
  }

  if !*omitNewLine {
    s += NewLine
  }

  os.Stdout.WriteString(s)
}
```
