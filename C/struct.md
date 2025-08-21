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
