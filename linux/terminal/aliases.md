Создание алиасов

`alias shortName="your custom command here"` - создание временного алиаса для текущей сессии

Чтобы создать постоянный алиас, нужно прописать его в файле настроек
Bash – ~/.bashrc
ZSH – ~/.zshrc
Fish – ~/.config/fish/config.fish
```sh
# custom aliases
alias hist="history -t '%F %T'"
```
