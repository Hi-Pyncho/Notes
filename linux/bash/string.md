
## Строки
### String Length
```sh
STRING="this is a string"
echo ${#STRING} # 16
```

### Сравнение строк  
```sh
=, ( == )   # строки равны 
!=          # строки неравны  
-eq         # равно  
-ne         # неравно 
-z          # строка пуста  
-n          # строка не пуста 
=~          # для регулярных выражений
```

### Конкатенация
```sh
string1="some string"
string2='another string'

string1+=$string2
echo $string1 #some stringanother string
```
### Взять подстроку
```sh
STRING="this is a string"
POS=1
LEN=3
echo ${STRING:$POS:$LEN}   # his
```
Если $LEN не указывать, тогда возьмется строка с первой позиции до конца
```sh
STRING="this is a string"
echo ${STRING:1}           # his is a string
echo ${STRING:12}          # ring
```
### Замена подстроки
Заменить первое вхождение подстроки
```sh
STRING="to be or not to be"
echo ${STRING[@]/be/eat}        # to eat or not to be
```
Заменить все вхождения подстроки
```sh
STRING="to be or not to be"
echo ${STRING[@]//be/eat} 
```
Заменить все вхождения пустой строкой
```sh
STRING="to be or not to be"
echo ${STRING[@]// not/}        # to be or to be
```
Заменить вхождение строки если это начало $STRING
```sh
STRING="to be or not to be"
echo ${STRING[@]/#to be/eat now}    # eat now or not to be
```
Заменить вхождение если это конец $STRING
```sh
STRING="to be or not to be"
echo ${STRING[@]/%be/eat}        # to be or not to eat
```
Заменить вхождение командой shell
```sh
STRING="to be or not to be"
echo ${STRING[@]/%be/be on $(date +%Y-%m-%d)} 
```
Найти вхождения через регулярные выражения
```sh
for file in $( ls ./* )
do
  if [[ $file =~ .*".txt"$ ]]
  then 
    echo "Filename is $file"
  fi
done

```
