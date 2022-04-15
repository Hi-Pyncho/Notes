## Удаленные репозитории

`git remote -v` (просмотр списка существующих удал-х репозиториев)  
`git remote add REPO_NAME REPO_ADRESS` (Добавляет название-закладку для адреса)  
`git remote add origin https://github.com/Hi-Pyncho/PracticeGit.git `  
`git remote remove REPO_NAME`


`git push REPO_NAME branch`  
`git push origin master`

Есть локальные ветки(изменяются самим пользователем) и remote ветки (изменяются другими пользователями)

На компьютере хранятся локальные (localBranch) и remote ветки (origin/master ...). Когда мы совершаем pull, то обновляем свои remote ветки. И потом сливаем remote ветку с текущей локальной веткой

`git pull origin master`

В итоге git pull это:
1) `git fetch` (скачивает, но не производит актуализацию локальной ветки)
2) `git merge origin/master` (актуализирует скачанную remote ветку с текущей)

`git fetch ssh/http/origin branchName` (достать изменения из определенной ветки)  
если этой ветки нет локально, то нужно создать новую ветку и закрепить за ней удаленную  
`git checkout -b branchName origin/branchName`  

Также можно любую ветку прикрепить к любой удаленной ветке  
`git checkout -b branchName origin/master` (теперь при git push с branchName будет пушиться на удаленную master по умолчанию)

Либо можно закрепиться так:  
`git branch -u orign/master branchName`  

Если уже находимся на branchName, то достаточно
`git branch -u origin/master`

Чтобы не прописывать постоянно `git pull origin master`, можно привязать локальную ветку к удаленной  
`git branch --set-upstream-to=origin/master`

Теперь можно писать просто `git push` или `git pull`  

Также можно посмотреть, какие локальные ветки связаны с удаленными
`git branch -vv`
Еще можно связать remote ветку с локальной при пуше  
`git push -u origin branchName` (-u === --set-upstream)

`git clone` - вместо git init / git remote ...
клонирует главную ветку  
`git clone ssh/https <dirName>`

Обычно при `clone` создается новая директорая с названием репозитория. Если нужно склонировать внутренности репозитория без создания папки, то добавляем в конце точку  
`git clone url_repo .`

Если разрабатывали на тесте и там же создали гит, залив в репозитории, а на проде пока не синхронизирован код с репозитория, можно насильно синхронизировать  
`git pull --allow-unrelated-history -X theirs repo_url`