# memory

Getting a Variable's Address
In C, you can print the address of a variable by using the address-of-operator: &. Here's an example:

```c
#include <stdio.h>

int main() {
  int age = 37;
  printf("The address of age is: %p\n", &age);
  return 0;
}

// The address of age is: 0xfff8
```

As it turns out, your code probably doesn't have direct access to the physical RAM in your computer.

Instead, your operating system provides a layer of abstraction called virtual memory. Virtual memory makes it seem like your program has direct access to all the memory on the machine, even if it doesn't.
- Physical Memory: The actual RAM sticks in your computer.
- Operating System: The software that manages access to the physical memory.
- Your Program: When it runs, it becomes a process and is given access to a chunk of virtual memory by the operating system.
- Virtual Memory: This abstracted chunk of memory that your program can use.

There are exceptions to this, for example if you're using C to build embedded firmware that runs without an operating system, your code might interact directly with physical memory.

By only giving processes access to a chunk of virtual memory, the operating system can do some cool things:

- Isolation: One process can't access the memory of another process.
- Security: The operating system can prevent processes from accessing certain parts of memory.
- Simplicity: Developers don't have to worry about managing physical memory and the memory of other processes.
- Performance: The operating system can optimize memory access depending on the hardware and needs of the program. For example, by moving data between physical memory and the hard drive.

![memory](img/2025-07-31-15-15-06.png)
