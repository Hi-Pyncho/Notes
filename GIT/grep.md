## Поиск по Git

Позволяет искать в файлах по вхождению слова или регулярному выражению.  
`git grep -n function_name`  
Флаг `-n` (или `--line-number`) покажет, на каких строках в каких файлах есть вхождение  

Можно найти количество совпадений (`-c` или `--count`)  
`git grep -c function_name`  

Если нужен контекст (например, в какой функции вызывался), то есть флаг `-p` или `--show-function`  
`git grep -p `

To search the commit log (across all branches) for the given text:

```
git log --all --grep='Build 0051'
```

To do so while ignoring case in the grep search:

```
git log --all -i --grep='Build 0051'
```

To search the actual content of commits through a repo's history, use:

```
git grep 'Build 0051' $(git rev-list --all)
```

to show all instances of the given text, the containing file name, and the commit sha1.

And to do this while ignoring case, use:

```
git grep -i 'Build 0051' $(git rev-list --all)
```

Note that this searches the _entire content_ of the commit at each stage, and not just the diff changes. To search just the diff changes, use one of the following:

```
git log -S[searchTerm]
git log -G[searchTerm]
```

Finally, as a last resort in case your commit is dangling and not connected to history at all, you can search the reflog itself with the `-g` flag (short for `--walk-reflogs`:

```
git log -g --grep='Build 0051'
```

If you seem to have lost your history, check the `reflog` as your safety net. Look for Build 0051 in one of the commits listed by

```
git reflog
```

You may have simply set your `HEAD` to a part of history in which the 'Build 0051' commit is not visible, or you may have actually blown it away. The [git-ready reflog](http://gitready.com/intermediate/2009/02/09/reflog-your-safety-net.html) article may be of help.

**To recover your commit from the reflog**: do a git checkout of the commit you found (and optionally make a new branch or tag of it for reference)

```
git checkout 77b1f718d19e5cf46e2fab8405a9a0859c9c2889
# alternative, using reflog (see git-ready link provided)
# git checkout HEAD@{10}
git checkout -b build_0051 # make a new branch with the build_0051 as the tip
```