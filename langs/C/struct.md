# struct

```c
struct City {
  char *name;
  int lat;
  int lon;
};

// Zero Initializer
// This sets all the fields to 0 values.
struct City c = {0};

// Positional Initializer
struct City c = {"San Francisco", 37, -122};

// Designated Initializer
struct City c = {
  .name = "San Francisco",
  .lat = 37,
  .lon = -122
};

// Accessing Fields
struct City c;
c.lat = 41; // Set the latitude
printf("Latitude: %d", c.lat); // Print the latitude

```

example
```c
#include <stdio.h>

struct Coordinate {
  int x;
  int y;
  int z;
};

struct Coordinate new_coord(int x, int y, int z) {
  struct Coordinate coord;
  coord.x = x;
  coord.y = y;
  coord.z = z;
  return coord;
}

// modern way
struct Coordinate new_coord(int x, int y, int z) {
  return (struct Coordinate){x, y, z};
}

struct Coordinate coord = new_coord(2, 3, 4);
printf("%d,%d,%d\n", coord.x, coord.y, coord.z);
```

## typedef
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

## Forward Declaration
Sometimes you have a struct that may need to reference itself, or be used recursively.
For example, consider a Node struct that can contain other Nodes. This might be useful for building a linked list or a tree:
```c
typedef struct Node node_t;

typedef struct Node {
  int value;
  node_t *next;
} node_t;
```

Forward declarations can also be used when two structs reference each other (a circular reference). For example, a Person has a Computer and a Computer has a Person:
```c
typedef struct Computer computer_t;
typedef struct Person person_t;

struct Person {
  char *name;
  computer_t *computer;
};

struct Computer {
  char *brand;
  person_t *owner;
};
```
