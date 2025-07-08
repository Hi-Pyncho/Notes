## GIT CLEAN
В отличие от RESET позволяет удалять untraked файлы  
`git clean -n` (покажет какие файлы будут удалены)  
`git clean -f `(удалит untraked файлы)  
`git clean -d` (удалит директории)  
`git clean -x` (удалит даже те, что в .gitignore)

Это для неотслеживаемых файлов. Для отслеживаемых команды `git reset --hard`, `git checkout -f`  

-----------------------------------------------------
## GIT REMOVE  
`git rm fileName `(удалит файл)  

После появится git status 'file deleted'. это можно закоммитить в предыдущий коммит

`git commit --amend --no-edit `

Также можно только удалить из коммита файл, а сам файл оставить  
`git rm --cached fileName` (появится в отслеж зоне что файл удален, плюс в неостлеж что файл untraked)