## Создание функций
```sh
function function_B () {
  varGlobal=1 # глобальная перменная
  local varLocal=1 # локальная переменная
}

function adder () {
  echo "$(($1 + $2))"
  echo $#
}
# компактная запись
functionName () { echo "1"; echo "2"; }
# Вызов функций
# Добавляем параметры в вызов функций
function_A "Function A."     # Function A.
function_B                   # Function B.
# Добавим 2 параметра в функция adder
adder 12 56                  # 68 2
```
