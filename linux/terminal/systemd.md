# systemd

## notify-send

`notify-send` - команды для управления уведомлениями

## systemd-analyze

`systemd-analyze [blame]` - вывести информацию о запуске системы

## journalctl

```sh
journalctl -n 100 — показывает первые 100 записей в журнале (вместо 100 можно использовать любое другое число)
journalctl _SYSTEMD_UNIT=earlyoom.service — просмотр записей, связанных с юнитом earlyoom.service
journalctl _COMM=sshd — показывает все записи, связанные с процессом sshd
journalctl _PID=1000 — показывает все записи, связанные с PID 1000
journalctl _UID=1000 — показывает все записи, связанные с UID 1000
journalctl _GID=1000 — показывает все записи, связанные с GID 1000
journalctl _HOSTNAME=linux — показывает все записи, связанные с хостом linux
journalctl --since "2024-01-01 12:00:00" — показывает все записи, начиная с указанной даты
journalctl --since "1 hour ago" — показывает все записи за последний час
journalctl --until 2024-01-01 — показывает все записи, заканчивая указанной датой
journalctl --since -1h — показывает все записи за последний час
journalctl --since -1days — показывает все записи за последние сутки
journalctl --vacuum-size=10M — удаляет записи, пока журнал не станет весом 10МБ.
journalctl --vacuum-time=1week — удаляет записи старше 1 недели.
journalctl --output=short — показывает записи в компактном виде
journalctl --output=verbose — показывает записи в расширенном виде
journalctl --output=json — показывает записи в json-формате
journalctl --verify — проверяет целостность журнала
journalctl -xeu "service" — отображает записи в формате JSON (-x) и единого события (-e) по указанной службе (-u).
journalctl -feu "service" — отображает записи в режиме реального времени (-f) и единого события (-e) по указанной службе (-u).
journalctl --list-boots — отображеает журналы, которые были созданы при загрузке системы
journalctl -b 0 — просмотреть журнал с текущего старта системы
journalctl -b -1 — просмотреть журнал с предыдущего старта системы
journalctl -k — просмотр сообщений ядра
```

## [создание сервисов](https://habr.com/ru/companies/timeweb/articles/824146/)

`systemctl list-units --type=service --state=active --no-legend | awk '{print $1}'` - вывести все активные в данные момент сервисы

Большинство сервисов хранятся в /etc/systemd/system.

расположение юнитов
/usr/lib/systemd/system/ – юниты из установленных пакетов RPM — всякие nginx, apache, mysql и прочее
/run/systemd/system/ — юниты, созданные в рантайме
/etc/systemd/system/ — юниты, созданные системным администратором
