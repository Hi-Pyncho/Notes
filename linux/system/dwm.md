# dwm

```sh
# in dwm folder change owner to modify without sudo
chown -R pyncho:pyncho .
```

Создать файл патча
```sh
diff -u original-file modified-file > patch-name.diff
```

Или скачать патч
```sh
curl -O link-to-patch-from-the-dwm-site
```

Применить патч
```sh
sudo patch < patch-name.diff
# or
sudo patch -F3 -i patches/patch-name.diff
# or
git apply --check --verbose patch-path.diff
git apply --reject --verbose patch-path.diff
# rebuild dwm after patch
```

Перекомпилировать
```sh
sudo make clean install
```
