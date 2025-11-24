```go
package main

import (
 "encoding/json"
 "fmt"
 "io/ioutil"
 "net/http"
)

type Person struct {
 Name string `json:"name"`
 Age  int    `json:"age"`
}

func main() {
  url := "https://example.com/api/endpoint"

  resp, err := http.Get(url)

  if err != nil {
    fmt.Println("Error sending GET request:", err)
    return
  }

  defer resp.Body.Close()

  if resp.StatusCode != http.StatusOK {
    fmt.Println("Request failed with status code:", resp.StatusCode)
    return
  }

  // Read and unmarshal the response body
  body, err := ioutil.ReadAll(resp.Body)
  if err != nil {
    fmt.Println("Error reading response body:", err)
    return
  }

  var person Person

  err = json.Unmarshal(body, &person)

  if err != nil {
    fmt.Println("Error unmarshalling JSON:", err)
    return
  }

  fmt.Println("Name:", person.Name)
  fmt.Println("Age:", person.Age)
}
```

handle POST
```go
func addUser(res http.ResponseWriter, req *http.Request) {
  if (req.Method != http.MethodPost) {
    http.Error(res, "method not allowed", http.StatusMethodNotAllowed)
  }

  body, err := io.ReadAll(req.Body)

  if (err != nil) {
    http.Error(res, "unvalid json", http.StatusBadRequest)
  }

  data := map[string]any{}

  err = json.Unmarshal(body, &data)

  if (err != nil) {
    http.Error(res, "unvalid json", http.StatusBadRequest)
  }

  res.WriteHeader(http.StatusCreated)

  success, err := json.Marshal(map[string]bool{"success": true})

  if (err != nil) {
    http.Error(res, err.Error(), http.StatusInternalServerError)
  }

  res.Write(success)
}
```
