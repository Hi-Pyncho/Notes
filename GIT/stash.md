## Git stash

Если нужно срочно перейти в другой ветке, а коммитить изменения пока рано, можно отложить эти изменения:  
`git stash`  

Если нужно и untracked файлы сохранить, то:  
`git stash --include-untracked` (or `-u`)

Если нужно отложить в __stash__ определенные определенные файлы или часть файла, используется флаг `-p`:  
`git stash -p`  


`git stash list` - показать все содержимое __stash__ хранилища  

## Применение отложенных изменений

`git stash pop` - применит самый последний элемент и удалит его из хранилища  
`git stash apply` - применит самый последний элемент и оставит его в хранилище

Если нужен конкретный элемент из хранилища:  
`git stash pop stash@{2}`  

Чтобы посмотреть внутренности изменений:  
`git stash show`  
Если нужно более подробно узнать об изменениях:  
`git stash show --patch` (или `-p`)

Если изменения в ветке отличаются от отложенных изменений, операции извлечения или применения последних могут привести к конфликтам. Вместо этого вы можете создать новую ветку с помощью команды `git stash branch` и применить отложенные изменения к ней.  
`git stash branch add-stylesheet stash@{1}`

## Удаление отложенных изменений

Удалить определенный набор отложенных изменений можно с помощью команды `git stash drop`:  
`git stash drop stash@{1}` 

Если нужно полностью очистить __stash__:  
`git stash clear`