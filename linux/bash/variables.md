## Переменные 

Объявляется в начале скрипта (шебанг) - программа, которая будет выполнять скрипт
```sh
#!/bin/bash
```

```sh
PRICE=5
echo "The price is $PRICE dollars"
```
К переменной можно обратиться через знак `$`, либо через конструкцию `${}`
```sh
MyFirstLetters=ABC
echo "The first 10 letters in the alphabet are: ${MyFirstLetters}DEFGHIJ"
```
---
`$0` - The filename of the current script.

`$n` - The Nth argument passed to script was invoked or function was called 

`$#` - The number of argument passed to script or function. 

`$@` - All arguments passed to script or function. 

`$*` - All arguments passed to script or function. 

`$?` - The exit status of the last command executed. 

`$$` - The process ID of the current shell. For shell scripts, this is the process ID under which they are executing.

`$!` - The process number of the last background command. 

```sh
#!/bin/bash
echo "Script Name: $0"
function func {
    for var in $*
    do
        let i=i+1
        echo "The \$${i} argument is: ${var}"
    done
    echo "Total count of arguments: $#"
}
func We are argument

# Script Name: fun.sh
# The $1 argument is: We
# The $2 argument is: are
# The $3 argument is: argument
# Total count of arguments: 3
```

## Внешние программы
В переменные можно записывать результат внешних программ из shell (через косые кавычки)
```sh
a=`echo "test"`
files=`ls ~`
```
Коды возврата  
```sh
0 # корректное завершение
не 0 # в процессе работы были ошибки
# узнать код
$?
# выйти с кодом
exit code
```
Например
```sh
touch text.txt
echo $?
```
Проверка кода возврата
```sh

```
