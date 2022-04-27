Создайте директорию для SSH, в том случае, если она еще не создана

```sh
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cd ~/.ssh
ssh-keygen
ssh-add
```

Скопируйте получившийся ключ id_rsa.pub на ваш хостинг или сервер:
```sh
scp -p id_rsa.pub sshusername@yousite.com:~
```
Подключитесь к удаленному серверу для внесения нового ключа в authorized_keys:
```sh
ssh sshusername@yousite.com
```
Если директория еще не существует, создайте ее и установите соответствующие права:
```sh
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```
Скопируйте сгенерированный ключ в специальный файл доступа 'authorized_keys' и установите на него безопасные права:
```sh
cat id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```
Удалите скопированный в корень вашего пользователя ключ, который уже добавили в общий файл и завершите вашу сессию командой logout:
```sh
rm -f ~/id_rsa.pub
logout
```

Если вы не получили сообщения вида "Identity added: /home/user/.ssh/id_rsa (/home/user/.ssh/id_rsa)", а получили оведомление вроде такого: "Could not open a connection to your authentication agent.", то следует запустить агента командой eval:
```sh
eval `ssh-agent -s`
```
И заново запустите ssh-add.
