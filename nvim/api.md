
`vim.cmd()` - функция для выполенения vim кода [ref](https://neovim.io/doc/user/lua-guide.html#lua-guide-vim-commands)

### variables
[vim.g](https://neovim.io/doc/user/lua.html#vim.g): global variables ([g:](https://neovim.io/doc/user/eval.html#g%3A))
[vim.b](https://neovim.io/doc/user/lua.html#vim.b): variables for the current buffer ([b:](https://neovim.io/doc/user/eval.html#b%3A))
[vim.w](https://neovim.io/doc/user/lua.html#vim.w): variables for the current window ([w:](https://neovim.io/doc/user/eval.html#w%3A))
[vim.t](https://neovim.io/doc/user/lua.html#vim.t): variables for the current tabpage ([t:](https://neovim.io/doc/user/eval.html#t%3A))
[vim.v](https://neovim.io/doc/user/lua.html#vim.v): predefined Vim variables ([v:](https://neovim.io/doc/user/eval.html#v%3A))
[vim.env](https://neovim.io/doc/user/lua.html#vim.env): environment variables defined in the editor session

### options
[vim.opt](https://neovim.io/doc/user/lua.html#vim.opt)

### plugins
You can map functions from Lua modules via

```lua
vim.keymap.set('n', '<Leader>pl1', require('plugin').action)
```

Note that this loads the plugin at the time the mapping is defined. If you want to defer the loading to the time when the mapping is executed (as for [autoload](https://neovim.io/doc/user/userfunc.html#autoload) functions), wrap it in `function() end`:

```lua
vim.keymap.set('n', '<Leader>pl2', function() require('plugin').action() end)
```

### keymap
https://neovim.io/doc/user/lua-guide.html#lua-guide-mappings-set

### nvim-lua-guide-ru
https://github.com/kuator/nvim-lua-guide-ru

![[files/LSP structure 2 1.png]]

### lsp
`:echo executable('vue-language-server')` - если возвращает 1, то neovim знает и может выполнить эту команду. конкретно в этом случае он знает что есть lsp сервер для vue
`:help ins-completion` - документация к completions в insert mode
`:help lsp` - документация по lsp

### expand
https://neovim.io/doc/user/builtin.html#expand()