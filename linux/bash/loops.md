## Loops
### bash for loop
```sh
NAMES=(Joe Jenny Sara Tony)
for N in ${NAMES[@]}
do
  echo "My name is $N"
done

# loop on command output results
for f in $( ls prog.sh /etc/localtime )
do
  echo "File is: $f"
done
```

`read userChoice` - команда для предложения ввести пользователю значение  
### bash while loop
```sh
again=yes

while [[ $again = "yes" ]]
do
  echo 'Please enter a name'
  read name
  echo "Then name you entered is $name"

  echo 'Do you want to continue? (yes/no)'
  read again
done

```
### bash until loop
```sh
COUNT=1
until [ $COUNT -gt 5 ]; do
  echo "Value of count is: $COUNT"
  COUNT=$(($COUNT + 1))
done
```
### "break" and "continue" statements
```sh
# вывести только 0,1,2,3,4

COUNT=0
while [ $COUNT -ge 0 ]; do
  echo "Value of COUNT is: $COUNT"
  COUNT=$((COUNT+1))
  if [ $COUNT -ge 5 ] ; then
    break
  fi
done

# Вывести только следующие числа - 1,3,5,7,9
COUNT=0
while [ $COUNT -lt 10 ]; do
  COUNT=$((COUNT+1))
  # Проверяем, четный ли COUNT
  if [ $(($COUNT % 2)) = 0 ] ; then
    continue
  fi
  echo $COUNT
done
```
