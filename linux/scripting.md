## Переменные 

Объявляется в начале скрипта 
```sh
#!/bin/bash
```

```sh
PRICE=5
echo "The price is $PRICE dollars"
```

## Аргументы скрипта

`$1,$2,$3` - обращение к аргументам скрипта по порядку  
`$#` - количество аргументов в скрипте

```sh
./bin/my_shopping.sh apple 5 banana 8 "Fruit Basket" 15
echo $3 # --> results with: banana
```
