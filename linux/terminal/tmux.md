## Программа для работы с несколькими вкладками на сервере
Если временно выйти из tmux, то он сохранит все процессы и информацию, даже если будет разрыв соединения с сервером. 

`CTRL + B` - вход в режим команд  
`CTRL + B + C` - создать новую вкладку  
`CTRL + B + <number>` - перейти в указанную вкладку  
`CTRL + B + X` - закрыть текущую вкладку (или `exit`)    
`CTRL + B + D` - временно выйти из tmux  
`tmux attach / tmux a` - вернуться в tmux  
`tmux list-sessions` - посмотреть список запущенных tmux       

`CTRL + B + PgUp` - перейти в режим просмотра истории (`PgUp, PgDown, arrows` - перемещать курсор по истории)  
`Esc, CTRL + C` - выйти из режима просмотра истории  

`CTRL + B + "` - разделить терминал горизонтально  
`CTRL + B + %` - разделить терминал вертикально    
`CTRL + B + arrows` - перемещаться по вкладкам  