## Git add

Если папка или файл находятся в .gitignore, то можно принудительно добавить в индекс файл или папку. И тогда изменения будут отслеживаться вне зависимости от .gitignore
`git add --force assets/js/script.js`

Если нужно сохранить в индекс только часть изменений в файле, то есть флаг `-p`, который позволяет пошагово добавить изменения в индекс

Коммиты без `add` (`--all`) - но игнорируются **untracked** файлы
`git commit -am 'new commit`

Если нужно отдельный файл закоммитить без `add`:  
`git commit -m 'ignore log files' .gitignore`

Флаг `-A` добавляет все измненеия, независимо, где мы находитмся, когда как точка `.` - только в текущей директории


## Git remove

Данная команда удаляет папку из директории и добавляет факт удаления в индекс (`git rm file`=`rm file`+`git add file`)   
`git rm filename`  
`git rm -r directory`

Если нужно удалить из индекса файл или папку, есть флаг `--cached`  
`git rm -r --cached directory`