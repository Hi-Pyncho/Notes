## Find

```sh
find -name "file.txt" # искать с учетом регистра

find -iname "FILE*.txt" # искать без учета регистра

find -path "*subdir*/*jpg" # найти все jpg, директорая которых содержит subdir

find -size 44k # найти файлы размером в 44 килобайта

find -maxdepth <number>
find -mindepth <number>
```

## Grep
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

# Sed
Потоковый редактор: читает строчки из __stdin__ (или из файла), обрабатывает их по инструкции и пишет в __stdout__
```sh
cat <file> | sed 'инструкция'
sed 'инструкция' <file>

# если хотим писать в файл:
> <file> # обычное перенаправление
-, --in-place # перезаписать входной файл

# заменить все John на Nick
sed 's/John/Nick/g' old.txt > new.txt

# заменить все слова, которые начинаются на J и кончаются на n на Nick
sed -r 's/[a-z]*n/Nick/g' old.txt > new.txt

# вывести все строки с 2 по 4
sed -n '2,4p' file.txt

# вывести все строки кроме 2-4
sed '2,4d' file.txt

# вывести строки с 2 цифрами подряд
sed -n '/[0-9]\{2\}/p' file.txt

# вывести все строки начиная со 2 до строки содержащей 'right' (с большой или маленькой буквы)
sed '2,/[Rr]ight/d' file.txt
```
