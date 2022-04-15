## ВЕТКИ

`git branch some-feature` (создать ветку с именем)  
`git branch` (список локальных веток)  
`git branch -v` (список локальных веток + инфа)  
`git branch -d` branchName (удаление ветки)  
`git branch -D` branchName (удаление ветки, даже не смерженной ни с чем)  
`git branch -r` (получим список remote веток)  
`git branch -m newBranchName` (переименовать текущую ветку)  
`git branch --marged` (показать ветки, которые сливались с текущей)  
`git branch --no-merged` (показать ветки, которые не сливались с текущей)  

## Reflog

Находится по пути `.git/logs/HEAD` и хранится от 30-90 дней. И работает только локально, в репозиторий не попадает.  

Является алиасом для команды `git log --oneline -g`  
`git reflog`  (без параметров показывает изменения HEAD)  
Так, например, можно найти удаленную ветку и либо восстановить эту ветку (`git branch branch_name commit`), либо взять определенные коммиты.

`git reflog --date=iso` - выведет логи вместе с датами.  

Также можно ходить по checkout назад с помощью команды `git checkout @{-n}` (или более кратко `git checkout -`, если на один checkout назад). Гит смотрит по reflog, ищет команду checkout и перемещает туда на столько шагов, сколько указано в __n__.

Если изменения уже сделаны в master, но работа еще не сделана и этим комитам не следует быть в мастере, можно откатить мастер назад, но сначала нужно уйти с этой ветки (`-f` нужен, чтобы переместить ветку, так как ветка мастер уже существует. Если ветки нет, то она будет создана на этом коммите)  
`git checkout -b fix`  
`git branch -f master commit_hash`  
Либо:  
`git checkout -B master commit_hash`  

`git checkout -b branchName` (создать и переместить на новую ветку)

`git merge nameBranch` (находясь на ветке master)  
`git merge nameBranch -m 'commit message'`  
`git merge --abort` (отменяет слияние)  
`git merge --allow-unrelated-history` (если выдает ошибку различия в истории)

Если в нашей ветке файл удален, а в сливаемой нет, то при конфликте можно либо оставить удаленным, либо восстановить его 
`git add fileName`

fast-forward merge (когда в master не было изменений, без конфликтов и когда git легко сливает ветки, не создается отдельный коммит для слияния merge commit)

`git pull` - добавит в локальные remote ветки все недостающие ветки с репозитория  
чтобы продолжить развивать конкретную ветку, выполняем
`git checkout branchName` (создается новая ветка и туда сливаются коммиты из origin/branchName)  

## Remote branches

`git remote show origin` (свяжется с репозиторием, покажет списком remote, локальные ветки, проверит, есть ли различия и нужно ли обновить)

`git push --delete origin coolFunction` (удалит remote ветку с репозитория)
`git push origin :oldBranch` (удалит remote ветку)

`git push origin comments:comments` (отправит текущую ветку comments в remote ветку comments)
