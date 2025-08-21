# typdef

```c
struct Pastry {
  char *name;
  float weight;
};

// This can also be written as:

typedef struct Pastry {
  char *name;
  float weight;
} pastry_t;
```
Now, you can use pastry_t wherever before you would have used struct Pastry.
The `_t` at the end is a common convention to indicate a type.

In fact, you can optionally skip giving the struct a name:

```c
typedef struct {
  char *name;
  float weight;
} pastry_t;

pastry_t muffin = {"Muffin", 0.3};
```
