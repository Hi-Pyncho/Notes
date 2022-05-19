Удалить расширения __.php__, __.html__
```
Options +MultiViews

RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.])$ $1.php [NC,L]

RewriteCond %{THE_REQUEST} \s/+(.+?)\.php[\s?] [NC]
RewriteRule ^
```

Сделать постоянное перенаправление с одной страницы на другую
```
Redirect 301 /page.html http://www.domain.ru/new_page.html
```

---
Флаги в RewriteCond  
`[NC]` - условие не чувствительно к регистру  
`[L]` - Last — остановить процесс преобразования на этом месте и не применять больше никаких правил преобразований.  
`[F]` - Forbidden — возвращает ошибку 403 Forbidden (запрещено).  
`[R]` - Redirect — останавливает процесс преобразования и возвращает результат браузеру клиента как редирект на новую страницу.  
`[S]` - Skip — пропускает следующее правило, если текущее правило сработало. Можно указать количество последующих игнорируемых правил [S=2].
`!-f` - запрос не является файлом  
`!-d` - запрос не является директорией  

Например это переводится как __«Строку, начинающуюся с application или modules или system не преобразовывать, доступ запретить»__
```
RewriteRule ^(application|modules|system) - [F,L]
```
---

Можно установить свои страницы ошибок
```
#401 Авторизация не выполнена
ErrorDocument 401 http://domain.ru/errors/401.html

#403 Доступ запрещен
ErrorDocument 403 http://domain.ru/errors/403.html

#404 Страница не найдена
ErrorDocument 404 http://domain.ru/errors/404.html

#500 Внутренняя ошибка сервера
ErrorDocument 500 http://domain.ru/errors/500.html
```
И также в robots.txt прописать
```
User-agent: *
Disallow: /errors
```
---
Постраничное перенаправление запросов на другой домен c кодом 301  
Следующий код перенаправит все запросы к страницам вашего сайта на аналогичные страницы другого сайта, например, запрос http://domain.ru/main будет переадресован на http://www.newdomain.ru/main:
```
Redirect 301 / http://www.newdomain.ru/
```
или
```
RewriteEngine On
RewriteRule ^(.*)$ http://newdomain.ru/$1 [R=301,L]
```
---
Ограничение доступа к сайту по IP  
Запретить доступ к сайту с IP-адресов 123.4.5.6 и 123.5.4.3
```
Order Allow,Deny
Allow from all
Deny from 123.4.5.6 123.5.4.3
```
Запретить доступ к сайту со всех адресов кроме 123.4.5.6 и 123.5.4.3:
```
Order Deny,Allow
Deny from all
Allow from 123.4.5.6 123.5.4.3
```
---
Включение обработки PHP в .html-файлах
```
RemoveHandler .html .htm
AddType application/x-httpd-php .php .htm .html .phtml
```
---
Перенаправление с HTTP на HTTPS и обратно   
На https
```
RewriteEngine on
RewriteCond %{ENV:HTTPS} !on
RewriteRule ^.*$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
На http
```
RewriteEngine on
RewriteCond %{ENV:HTTPS} on
RewriteRule ^.*$ http://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
---
Можно запретить или разрешить доступ к определенной группе файлов. Например, к файлам с расширением ".key":
```
<Files "\.(key)$">
  Order Deny,Allow
  Deny from all
  Allow from 81.222.144.12
</Files>
```
--- 
Паролирование директорий.  
Создать пароль можно командой через SSH или сгенерировать через онлайн-сервисы
```
htpasswd -c .htpasswd логин пароль
```
Создаем файл .htaccess
```
AuthName "Protected area, need authorization"
AuthType Basic
AuthUserFile /home/t/test/.authfile
require valid-user
```
Данный файл нужно положить в ту директорию, на которую мы хотим поставить пароль

Указывая valid-user, Вы разрешаете доступ всем пользователям, перечисленным в файле паролей.  
Приведем пример для доступа определенных пользователей из файла с паролями .htpasswd:
```
AuthName "Protected area, need authorization"
AuthType Basic
AuthUserFile /home/t/test/.authfile
require Alexey Kondr Fenix
```
Также, как и с запретом доступа по IP, здесь можно использовать расширение <Files> . Ниже приведены два примера: установки пароля на один определенный файл
```
<Files "passwd.html">
  AuthName "Protected area, need authorization"
  AuthType Basic
  AuthUserFile /home/t/test/.authfile
  require valid-user
</Files>
```
---
Включение модуля mod_expires и выставление настроек времени кэширования статических файлов:
```
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType image/jpeg "access plus 3 days"
  ExpiresByType image/gif "access plus 3 weeks"
  ExpiresByType image/png "access plus 3 months"
  ExpiresByType text/css "access plus 3 years"
  ExpiresByType application/javascript "access plus 3 hours"  
</IfModule>
```
