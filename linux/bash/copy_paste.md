Для начала нужно установить программу `xclip`
```sh
sudo apt-get install xclip
```
Теперь можно перенаправлять вывод в буфер обмена
```sh
cat file | xclip -sel clip
```
