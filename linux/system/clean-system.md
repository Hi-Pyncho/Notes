```sh
df -h # посмотреть информация о размерах разделов
ncdu path # Посмотреть размеры директорий

sudo journalctl --vacuum-size=100M  # Оставить последние 100 МБ логов
docker system prune -a --volumes  # Удалить неиспользуемые контейнеры/образы
sudo pacman -Sc  # Удалить кеш старых версий пакетов
sudo pacman -Rns $(pacman -Qdtq)  # Удалить "осиротевшие" пакеты
```
