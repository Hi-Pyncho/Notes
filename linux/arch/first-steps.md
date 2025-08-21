# first steps

Нужно убедиться, что при установке скопированы параметры network конфигурации и установлены пакеты `git neovim vi`

## Проверка интернета
```sh
systemctl status systemd-resolved

# если неактивно, включаем для правильного распознавания dns
systemctl start systemd-resolved
```

## Добавление sudo прав
```sh
visudo
# search /wheel and uncomment 'same thing without password'
```

## Обновить арч
```sh
sudo pacman -Syu
```

## Установка yay
```sh
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Xorg
```sh
yay -S xorg-server
```

## Time
```sh
sudo ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime
```

## Locales
```sh
# раскомментировать локали
sudo nvim /etc/locale.gen

# сгенерировать локали
sudo locale-gen

# добавить локали в конфиг
sudo nvim /etc/locale.conf
# LANG=en_US.UTF-8
```

## Keybord layouts
```sh
# если нет, создать папку
sudo mkdir -p /etc/X11/xorg.conf.d/

vs /etc/X11/xorg.conf.d/00-keyboard.conf
```
и добавить туда
```
Section "InputClass"
  Identifier "system-keyboard"
  MatchIsKeyboard "on"
  Option "Xkblayout" "us,ru"
  Option "XkbOptions" "grp:alt_shift_toggle"
EndSection
```
