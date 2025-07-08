# Grep

```sh
# список файлов с этой строкой
grep -l "string" <pathToFile>

# список файлов, где этой строки нет
grep -L "string" <pathTofile>

# вывести номер строки в файле 
grep -n "string" <pathToFile>

# не искать дальше после заданного числа вхождений в каждом файле
grep -m <number> "string" <pathToFile>

# выводить число строк после вхождения
grep -A <number> "string" <pathToFile>

# выводить число строк до вхождения
grep -B <number> "string" <pathToFile>

# выводить число строк вокруг вхождения
grep -C <number> "string" <pathToFile>

# найти указанный шаблон в файле
grep -E "шаблон" <pathToFile>
```
