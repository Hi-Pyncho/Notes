## Массивы
```sh
my_array=(apple banana "Fruit Basket" orange)
new_array[2]=apricot
```
Получить число элементов в массиве - `${#arrayname[@]}`
```sh
my_array=(apple banana "Fruit Basket" orange)
echo ${my_array[3]}                     # orange
# Добавим еще один элемент
my_array[4]="carrot"          
# Получить количество элементов в массиве        
echo ${#my_array[@]}                    # 5
echo ${my_array[${#my_array[@]}-1]}     # carrot
# Обратиться ко всем значениям в массиве
echo ${array[@]}
```
Добавить элемент в конец массива можно несколькими способами:  
```sh
my_array+=("Dish Washer")
my_array[${#my_array[@]}]="Python"
my_array=(${my_array[@]} "Jack Fruit")
```
Объединить два массива
```sh
arrVar1=("John" "Watson" "Micheal" "Lisa")
arrVar2=("Ella" "Mila" "Abir" "Hossain")

arrVar=(${arrVar1[@]} ${arrVar2[@]})
```
