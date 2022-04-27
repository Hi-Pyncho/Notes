## Права доступа

Права у файлов  
`r` - просмотр содержимого  
`w` - редактирование  
`x` - запуск

Права у директорий  
`r` - просмотр содержимого  
`w` - создание/удаление файлов/поддерикторий  
`x` - 1) вход в директорию, 2) просмотр inode (мета информация) файлов/поддерикторий

```sh
# Узнать, кто сейчас в системе
users

# Узнать, какие вообще есть пользователи
less /etc/passw

# Узнать группы пользователя
groups <username>
```

rwx|rw-|r--|
---|---|---|
owner|group|other|
1  1  1|1  1  0|1  0  0|
4+2+1|4+2+0|4+0+0|

Итого: __764__

Изменить права доступа
```sh
chmod [ugoa] [+-] [rwx] path
chmod ug+rw file.txt

chmod [octal code] path
chmod 777 file.txt
```

Сменить владельца
```sh
chown [new_user]:[new_group] path
chown username file.txt
chown :usergroup test
```

# Утилита su для работы от лица другого пользователя 
Утилита su позволяет пользователю запустить командную оболочку от лица другого пользователя.
```sh
su username # потребует пароль
```
# Useradd - добавление учетных записей
```sh
useradd -m -d /home/yanina -c "yanina wickmayer" yanina
tail -1 /etc/passwd
yanina:x:529:529:yanina wickmayer:/home/yanina:/bin/bash
```
