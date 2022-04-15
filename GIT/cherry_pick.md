## Cherry pick

Например, есть ветка прода и фичи. И на фиче нашли ошибку, которая есть и на проде. Тогда можно создать отдельный коммит и перенести на прод. Создаются эквивалентные коммиты.

`git cherry-pick commit`  
`git cherry-pick main..feature` - (можно указать диапазон - все коммиты __feature__, которых нет а __master__)

Также как и __merge__, __cherry-pick__ входит в запомненное состояние  
`git cherry-pick --abort` - отменит cherry-pick и вернет как было  
`git cherry-pick --continue` - продолжит cherry-pick если все конфликты разрешены  
`git cherry-pick --abort` - отменит cherry-pick и вернет как было  
`git cherry-pick --quit` - остановиться и сбросить запомненное состояние cherry-pick  

Если не нужно коммитить, а просто перенести изменения, то есть флаг `--no-commit` (или `-n`)  
`git cherry-pick -n commit`  
