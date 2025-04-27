---

---


## windows
`index + c` create new window (or `tmux new-window`)
`index + 0..n` select window
`index + p` previous window
`index + n` next window
`index + ~` show command history
`index + &` kill window
`index + ,` rename window (or `tmux rename-window [new name])`)

## panes
`index + x` kill pane
`index + {` prev pane
`index + }` next pane
`index + "` split horizontally
`index + %` split vertically

## sessions
`index + d` detouch session
`tmux list-sessions / tmux ls` display sessions list
`tmux attach / tmux a` attach to session
`tmux attach -t <n>` attach to target session
`index + $ / tmux rename-session <session-name>` while attaching to session, rename the session name
`index + s` preview and switch sessions in attaching mode
`pkill -f tmux` - kill tmux process with all sessions
`tmux kill-session -a` - kill sessions except attached session