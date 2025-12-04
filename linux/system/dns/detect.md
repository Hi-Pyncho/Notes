---

### 1. **Посмотрите, какие сетевые службы активны**

```bash
systemctl list-units --type=service --state=active | grep -E 'network|NetworkManager|dhcpcd|systemd-networkd|wpa_supplicant'
```

Обратите внимание на следующие возможные службы:

- `NetworkManager.service` — значит используется **NetworkManager**.
- `dhcpcd.service` — значит используется **dhcpcd** (часто в минималистичных установках).
- `systemd-networkd.service` — значит используется **systemd-networkd**.
- `systemd-resolved.service` — это не сетевой менеджер сам по себе, но часто идёт вместе с `systemd-networkd` или `NetworkManager`.

---

### 2. **Проверьте, запущен ли NetworkManager**

```bash
nmcli general status
```

Если команда работает и выводит статус (например, `connected`, `disconnected`), значит у вас **NetworkManager**.

Если команда не найдена или выдаёт ошибку — скорее всего, он не установлен или не используется.

---

### 3. **Проверьте, используется ли systemd-networkd**

```bash
systemctl is-active systemd-networkd
```

Если вывод: `active` — значит используется **systemd-networkd**.

Также проверьте наличие конфигураций:

```bash
ls /etc/systemd/network/
```

Если там есть `.network` или `.netdev` файлы — это признак использования `systemd-networkd`.

---

### 4. **Проверьте, запущен ли dhcpcd**

```bash
systemctl is-active dhcpcd
```

Если `active` — вы используете **dhcpcd**, особенно если нет других менеджеров.

---

### 5. **Посмотрите, кто управляет /etc/resolv.conf**

```bash
ls -l /etc/resolv.conf
```

- Если это **симлинк на `/run/systemd/resolve/...`** → используется `systemd-resolved` (часто с `systemd-networkd` или `NetworkManager`).
- Если это **симлинк на `/var/run/dhcpcd/resolv.conf`** → используется `dhcpcd`.
- Если это **обычный файл**, но перезаписывается — возможно, `dhcpcd` или `NetworkManager` без симлинка.

Также посмотрите, кто владеет файлом:

```bash
lsof /etc/resolv.conf
```

(установите `lsof`, если не установлен: `sudo pacman -S lsof`)

---

### 6. **Узнайте, какие пакеты установлены**

```bash
pacman -Q | grep -E 'networkmanager|dhcpcd|systemd'
```

Например:
- `networkmanager` → установлен NetworkManager.
- `dhcpcd` → установлен dhcpcd.
- `systemd` всегда установлен, но смотрите, активен ли `systemd-networkd`.

---

### Пример интерпретации

| Команда | Вывод | Вероятный менеджер |
|--------|-------|--------------------|
| `systemctl is-active NetworkManager` | `active` | **NetworkManager** |
| `systemctl is-active dhcpcd` | `active` и NetworkManager не активен | **dhcpcd** |
| `systemctl is-active systemd-networkd` | `active` | **systemd-networkd** |

---

После определения менеджера вы сможете выбрать правильный способ настройки DNS — например, через `nmcli`, `resolv.conf` с `dhcpcd`, или `resolved.conf` с `systemd`.

Если хотите — просто пришлите вывод команд:

```bash
systemctl list-units --type=service --state=active | grep -E 'NetworkManager|dhcpcd|networkd'
ls -l /etc/resolv.conf
```
