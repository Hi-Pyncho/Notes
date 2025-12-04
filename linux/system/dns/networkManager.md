### ✅ Что делать дальше — настройка DNS через NetworkManager

#### 1. **Убедитесь, что NetworkManager управляет DNS**
Посмотрите текущие настройки подключения:

```bash
nmcli con show
```

Найдите активное подключение (например, `"Wired connection 1"` или `"MyWiFi"`).

Затем посмотрите, как настроен DNS для него:

```bash
nmcli con show "Имя подключения" | grep ipv4.dns
```

Если вывод пустой или `auto`, DNS берётся от DHCP.

#### 2. **Установите постоянные DNS-серверы через NetworkManager**

Например, для подключения с именем `"Wired connection 1"`:

```bash
sudo nmcli con mod "Wired connection 1" ipv4.dns "1.1.1.1 8.8.8.8"
sudo nmcli con mod "Wired connection 1" ipv4.ignore-auto-dns yes
```

> `ignore-auto-dns yes` — отключает DNS, получаемый от роутера по DHCP.

Примените изменения:

```bash
sudo nmcli con down "pyncho_5G" && sudo nmcli con up "pyncho_5G"
```

После этого NetworkManager **автоматически обновит `/etc/resolv.conf`**, **но только если он является симлинком или обычным файлом, не защищённым от записи**.

---

### ⚠️ Проблема: ваш `/etc/resolv.conf` — обычный файл

NetworkManager по умолчанию **не перезаписывает** `/etc/resolv.conf`, если он уже существует как обычный файл (не симлинк). Это сделано из соображений безопасности.

#### Решение:

Либо **удалите файл и позвольте NetworkManager создать симлинк**:

```bash
sudo rm /etc/resolv.conf
sudo systemctl restart NetworkManager
```

После этого NetworkManager создаст симлинк:
```text
/etc/resolv.conf -> /var/run/NetworkManager/resolv.conf
```

И DNS будет обновляться автоматически.

**ИЛИ** — если вы хотите оставить `/etc/resolv.conf` как обычный файл — вы можете **вручную указать DNS в нём**, но тогда NetworkManager **не будет обновлять его автоматически**, и ваши настройки DNS не будут зависеть от подключения (например, при переходе с Wi-Fi на Ethernet).

---

### 🔍 Проверка результата

После настройки проверьте:

```bash
cat /etc/resolv.conf
nslookup example.com
```

Вы должны увидеть ваши DNS-серверы и успешный ответ.

---

### Дополнительно: отключить systemd-resolved (если мешает)

Иногда `systemd-resolved` конфликтует с NetworkManager. Проверьте:

```bash
systemctl is-active systemd-resolved
```

Если `active`, и вы не планируете использовать его — отключите:

```bash
sudo systemctl disable --now systemd-resolved
```

И убедитесь, что `/etc/resolv.conf` не ссылается на него.

---

Если скажете имя вашего активного подключения (`nmcli con show`), могу дать точную команду для настройки DNS.
