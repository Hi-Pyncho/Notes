# Udev

Linux `udev` management tool.
More information: <https://www.freedesktop.org/software/systemd/man/udevadm.html>.

Monitor all device events:

    sudo udevadm monitor

Print `uevents` sent out by the kernel:

    sudo udevadm monitor [-k|--kernel]

Print device events after being processed by `udev`:

    sudo udevadm monitor [-u|--udev]

List attributes of device `/dev/sda`:

    sudo udevadm info [-a|--attribute-walk] /dev/sda

Reload all `udev` rules:

    sudo udevadm control [-R|--reload]

Trigger all `udev` rules to run:

    sudo udevadm trigger

Test an event run by simulating loading of `/dev/sda`:

    sudo udevadm test /dev/sda


[arch-wiki](https://wiki.archlinux.org/title/Udev_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9))

## настроить событие и выполнение скрипта на подключение внешнего монитора
монитор можно найти через `xrandr` и по пути `/sys/class/drm/`

`/etc/udev/rules.d/95-monitor-hotplug.rules`
```sh
ACTION=="change", SUBSYSTEM=="drm", KERNEL=="card1", RUN+="/home/pyncho/.dotfiles/scripts/handle-monitors.sh"
```

`/home/pyncho/.dotfiles/scripts/handle-monitors.sh`
```sh
#!/bin/sh

# export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
export DISPLAY=:0
export XAUTHORITY=/home/pyncho/.Xauthority

NOTEBOOK_MONITOR="eDP"
EXTERNAL_MONITOR="DisplayPort-0"

if xrandr --query | grep -q "$EXTERNAL_MONITOR connected"; then
  # Внешний монитор подключен - делаем его основным
  xrandr --output "$EXTERNAL_MONITOR" --auto --primary \
    --output "$NOTEBOOK_MONITOR" --auto --right-of "$EXTERNAL_MONITOR"
else
  # Только ноутбук - делаем его основным и отключаем внешний
  xrandr --output "$NOTEBOOK_MONITOR" --auto --primary \
    --output "$EXTERNAL_MONITOR" --off
fi
```

нужно убедиться, что переменная XAUTHORITY верная и ведет на статичный путь
```sh
echo $XAUTHORITY # должно быть /home/pyncho/.Xauthority
```
если нет, то создаем этот файл и присваиваем нужные права
```sh

# Устанавливаем правильные права
chown pyncho:pyncho ~/.Xauthority
chmod 600 ~/.Xauthority
```
также смотрим вывод команды `systemctl status systemd-udevd.service`

# Копируем текущий временный файл аутентификации в домашнюю директорию
также нужно обновлять файл `.Xauthority` при входе в систему, добавив в `.xinitrc` строчку
`cp $XAUTHORITY ~/.Xauthority`

после нужно перезагрузить правила
`sudo udevadm control -R`

скрипт для слежения за устройствами
`sudo udevadm monitor --property --udev`
