
`journalctl -b -1` - просмотр журнала предыдущей загрузки

`journalctl -b -1 -k` - журналы ядра предыдущей загрузки

`dmesg -T` - с временными метками

`journalctl -xe` - показывает последние записи, включая ошибки и предупреждения

`sudo dmesg -T | grep -i error`

`journalctl -b -u display-manager` - журнал конкретной службы

`/var/log/Xorg.*.log` - лог xorg `(EE)` (ошибки) или `(WW)` (предупреждения)

`sudo journalctl -k --since "1 hour ago" | grep -i "machine check\|mce\|error"`

`sudo journalctl -u rasdaemon`
