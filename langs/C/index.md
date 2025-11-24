# C lang

## Pragma Once and Header Guards
Multiple inclusions. If the same header file gets included more than once, you can end up with some nasty errors caused by redefining things like functions or structs.

### pragma once
```c
// my_header.h

#pragma once

struct Point {
  int x;
  int y;
};

```
## header guards
```c
#ifndef MY_HEADER_H
#define MY_HEADER_H

// some cool code

#endif

```
