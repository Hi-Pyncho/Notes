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
vim /etc/locale.gen

# сгенерировать локали
locale-gen

# добавить локали в конфиг
vim /etc/locale.conf
# LANG=en_US.UTF-8
```
