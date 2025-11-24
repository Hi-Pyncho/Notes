# arrays

An array is a fixed-size, ordered collection of elements. They are indexed by integers, starting at zero. They can only hold elements of the same type. They are stored in contiguous memory, like structs.

```c
int numbers[5] = {1, 2, 3, 4, 5};

numbers[1] = 11;

for (int i = 0; i < 5; i++) {
  printf("%d ", numbers[i]);
}
printf("\n");
```

In C, arrays and pointers are closely related. An array name acts as a pointer to the first element of the array. That means array indexing and pointer arithmetic can be used interchangeably to access array elements.

```c
int numbers[5] = {1, 2, 3, 4, 5};
// The name numbers acts as a pointer to the first element of the array.
// numbers_ptr is a pointer to the same place as numbers.
int *numbers_ptr = numbers;

// Access the third element (index 2)
int value = numbers[2];
// Which is the same as:
int value = *(numbers + 2);
// Here, numbers + 2 computes the address of the third element, and * dereferences it to get the value.

// When you add an integer to a pointer, the resulting pointer is offset by that integer times the size of the data type.
int *p = numbers + 2;  // p points to the third element
int value = *p;        // value is 3
```
Let's assume numbers is stored starting at memory address 0x1000. An integer is typically 4 bytes in C. Here's how the array elements are laid out in memory:

Address|Element|Value
-|-|-|
0x1000|numbers[0]|1
0x1004|numbers[1]|2
0x1008|numbers[2]|3
0x100C|numbers[3]|4
0x1010|numbers[4]|5

numbers + 0 or &numbers[0] points to 0x1000
numbers + 1 or &numbers[1] points to 0x1004
numbers + 2 or &numbers[2] points to 0x1008
numbers + 3 or &numbers[3] points to 0x100C
numbers + 4 or &numbers[4] points to 0x1010

```c
int numbers[5] = {1, 2, 3, 4, 5};

// Accessing elements using array indexing
printf("numbers[2] = %d\n", numbers[2]);  // Output: 3

printf("*(numbers) = %d\n", *numbers);  // Output: 1

// Accessing elements using pointers
printf("*(numbers + 2) = %d\n", *(numbers + 2));  // Output: 3

// Pointer arithmetic
int *ptr = numbers;
int *ptr1 = &numbers[1];

printf("Pointer ptr1 points to numbers[1]: %d\n", *ptr1);  // Output: 2

printf("Pointer ptr points to numbers[0]: %d\n", *ptr);  // Output: 1
ptr += 2;
printf("Pointer ptr points to numbers[2]: %d\n", *ptr);  // Output: 3

return 0;
```

## multibyte arrays

```c
typedef struct Coordinate {
  int x;
  int y;
  int z;
} coordinate_t;

coordinate_t points[3] = {
  {1, 2, 3},
  {4, 5, 6},
  {7, 8, 9}
};

printf("points[1].x = %d, points[1].y = %d, points[1].z = %d\n",
  points[1].x, points[1].y, points[1].z
);
// points[1].x = 4, points[1].y = 5, points[1].z = 6

coordinate_t *ptr = points;
printf("ptr[1].x = %d, ptr[1].y = %d, ptr[1].z = %d\n",
  (ptr + 1)->x, (ptr + 1)->y, (ptr + 1)->z
);
// ptr[1].x = 4, ptr[1].y = 5, ptr[1].z = 6

```

Assuming each int is 4 bytes, the Coordinate structure will be 12 bytes (3 * 4 bytes). Let's assume the points array starts at memory address 0x2000.

Address|Element|Value|Offset (bytes)
-|-|-|-|
0x2000|points[0].x|1|0
0x2004|points[0].y|2|4
0x2008|points[0].z|3|8
0x200C|points[1].x|4|12
0x2010|points[1].y|5|16
0x2014|points[1].z|6|20
0x2018|points[2].x|7|24
0x201C|points[2].y|8|28
0x2020|points[2].z|9|32

points + 0 or &points[0] points to 0x2000
points + 1 or &points[1] points to 0x200C (next structure, offset by 12 bytes)
points + 2 or &points[2] points to 0x2018

## array casting

Because arrays are basically just pointers (in most cases), and we know that structs are contiguous in memory, we can cast the array of structs to an array of integers:
```c
coordinate_t points[3] = {
  {5, 4, 1},
  {7, 3, 2},
  {9, 6, 8}
};

int *points_start = (int *)points;

for (int i = 0; i < 9; i++) {
  printf("points_start[%d] = %d\n", i, points_start[i]);
}
/*
points_start[0] = 5
points_start[1] = 4
points_start[2] = 1
points_start[3] = 7
points_start[4] = 3
points_start[5] = 2
points_start[6] = 9
points_start[7] = 6
points_start[8] = 8
*/
```

## Arrays Decay to Pointers
So we know that arrays are like pointers, but they're not exactly the same. Arrays allocate memory for all their elements, whereas pointers just hold the address of a memory location. In many contexts, arrays decay to pointers, meaning the array name becomes "just" a pointer to the first element of the array.
Arrays decay when used in expressions containing pointers:
```c
int arr[5];
int *ptr = arr;          // 'arr' decays to 'int*'
int value = *(arr + 2);  // 'arr' decays to 'int*'
```
And also when they're passed to functions... so they actually decay quite often in practice. That's why you can't pass an array to a function by value like you do with a struct; instead, the array name decays to a pointer.

When Arrays Don't Decay
- sizeof Operator: Returns the size of the entire array (e.g., sizeof(arr)), not just the size of a pointer.
- & Operator Taking the address of an array with &arr gives you a pointer to the whole array, not just the first element. The type of &arr is a pointer to the array type, e.g., int (*)[5] for an int array with 5 elements.
- Initialization: When an array is declared and initialized, it is fully allocated in memory and does not decay to a pointer.

```c
void core_utils_func(int core_utilization[]) {
  printf("sizeof core_utilization in core_utils_func: %lu\n", sizeof(core_utilization)); // 8 as size of pointer
}

int main() {
  int core_utilization[] = {43, 67, 89, 92, 71, 43, 56, 12};
  int len = sizeof(core_utilization) / sizeof(core_utilization[0]);
  printf("sizeof core_utilization in main: %zu\n", sizeof(core_utilization));
  printf("len of core_utilization: %d\n", len);
  core_utils_func(core_utilization);
  return 0;
}
```
