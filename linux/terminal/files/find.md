# Find

```sh
find -name "file.txt" # искать с учетом регистра

find -iname "FILE*.txt" # искать без учета регистра

find -path "*subdir*/*jpg" # найти все jpg, директорая которых содержит subdir

find -size 44k # найти файлы размером в 44 килобайта

find -maxdepth <number>
find -mindepth <number>
```
