## Ветвления

```sh
NAME="George"
if [ $NAME = "John" ] 
then
  echo "John Lennon"
elif [ $NAME = "George" ] 
then
  echo "George Harrison"
else
  echo "This leaves us with Paul and Ringo"
fi
```
пробелы вокруг `=` обязательны

### Логические сочетания
```sh
if [[ $VAR_A[0] -eq 1 && ($VAR_B = "bee" || $VAR_T = "tee") ]] ; then
    command...
fi
```
### Структура CASE
```sh
case $variable in
    $condition1 )
        command...
    ;;
    $condition2 )
        command...
    ;;
    *)
    # действие по умолчанию
    ;;
esac
```
### Пример CASE с возрастом
```sh
read age
case $age in
  [1-9]|1[1-6]) # от 1 до 16
    group="child"
    ;;
  1[7-9]|2[0-5]) # от 17 до 25
    group="youth" 
    ;;
  *)
    group="adult" 
    ;;
esac

```
