# Конспект по bash командам

## Выполнение программ

Чтобы узнать, где программа находится можно воспользоваться следующими командами: `type`, `whereis`, `which`.

## Узнать размер директории / файла

```
du -sh
```
- `du -h` : GB
- `du -m` : MB
- `du -k` : KB

## Вывести папки по размеру

```
du -sh -- */ | sort -rh
```

## Вывести размер untracked файлов в git

```
git status --porcelain | awk {print $2} | xargs ls -hs | sort -h
```