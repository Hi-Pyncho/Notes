## КОМАНДЫ GIT

### ПЕРВОНАЧАЛЬНАЯ НАСТРОЙКА
`git config --global user.name "[имя]"`   
`git config --global user.email "[адрес электронной почты]"`

Есть три уровня задания кофига
1) `--system`
   - /etc/gitconfig
   - C:/Program Files/Git/etc/gitconfig
      - C:/ProgramData/Git/config
2) `--global`
   - ~/.gitconfig
   - C:/Users/USERNAME/.gitconfig
3) `--local` (default)
   - project/.git/config

Посмотреть параметры (из всех конфигов) можно командой  
`git config --list`  
Только global/system/local  
`git config --list --global`

Удалить конфиги можно командой `--unset`  
`git config --unset user.email`  
Удалить всю секцию с конфигом  
`git config --remove-serction user`
Поставить редактор по умолчания
`git config --global core.editor 'vim'`

## Аlias
Можно устанавливать краткие названия для команд (например, для `config -- global` хотим использовать `c`)  
`git config --global alias.c 'config -- global'`

Чтобы создать алис на несколько команд (одна за другой) - поставить `!` знак  
`git config alias.sayhi '!echo "hello"; echo "from git"'`  

## Посмотреть документацию команды
`git config -h`  
`git help config` или `git config --help`

## Синоним HEAD  
Для слова HEAD есть синоним `@`, потому команды можно прописать так:  
`git show @~1`  

### ПРИ СОЗДАНИИ НОВОГО РЕПОЗИТОРИЯ
`git branch -M main`  
`git remote add origin https://github.com/Hi-Pyncho/test.git`  
`git push -u origin main`

-----------------------------------------------------
### HELP
`git help commandName` (покажет справку по команде)  
`git help checkout`

-----------------------------------------------------
### НАСТРОЙКА SSH (Secure SHell)
Это сетевой протокол, позволяющий производить удаленное управление операционной системой и безопасно передавать данные в незащищенной среде

`ls -al ~/.ssh` (посмотреть все ключи на компьютере. если нет, то сгенерировать). Потом добавить на gitHub и можно будет коммитить без ввода ключа и пулл реквеста

---

### CREDENTIALS
`git config credential.helper 'store [<options>]'` - так можно сохранить логи с паролем, чтобы пушить и пулить

---

### Глобальный ignore файл
```git
git config ---global core.excludesFile ~/.gitignore
```

---

### Права на файл
После коммита есть такая строка  
`create mode 100644`  
Где 100 - это тип объекта (100 - файл)  
`644` -> неисполняемый файл    
`755` -> исполняемый файл

### PRETTY FORMATS
`git show --pretty=fuller`

- oneline
```
<hash> <title line>
```
- short
```
commit <hash>
Author: <author>

<title line>
```
- medium
```
commit <hash>
Author: <author>
Date:   <author date>

<title line>

<full commit message>
```
- full
```
commit <hash>
Author: <author>
Commit: <committer>

<title line>

<full commit message>
```
- fuller
```
commit <hash>
Author:     <author>
AuthorDate: <author date>
Commit:     <committer>
CommitDate: <committer date>

<title line>

<full commit message>
```
