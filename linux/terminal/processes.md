## Выполнение программ

В линуксе процесс рассматривается как единица планирования + атрибуты, связанные с организацией использования ресурсов.

`CTRL + C` - прервать выполнение программы  
`CTRL + Z` - приостановить выполнение:
- `fg` - продолжить (foreground)
- `bg` - продолжить в фоновом режиме (background)

`jobs` - посмотреть запущенные программы  
`fg %<номер>` - продолжить программу с этим номером  
`bg %<номер>` - продолжить программу с этим номером в фоновом режиме  
Если в конце команды добавить `&` - то она запустится в фоновом режиме, например `vim test.txt &`  
`ps` - посмотреть список процессов  
`top` - отслеживать процессы в реальном времени  
`top -u <user_name>` - отслеживать процессе конкретного пользователя  
`kill <process_id>` - завершить процесс с этим номером  
`kill -9 <process_id>` - убить процесс с этим номером  

`lscpu` - вывести информацию о процессоре  
`htop` - программа для вывода процессов и загрузки системы  

Чтобы узнать, где программа находится можно воспользоваться следующими командами: `type`, `whereis`, `which`.

Отслеживание всех процессов при выполении команды `lstat` (для библиотек) и `sstat` (для системных вызовов)

`pstree` - просмотреть дерево процессов
`pstree -p` - просмотреть дерево процессов (включая id процессов)

### Создание процесса
Шаги (старый метод `fork-exec`)
1) `fork` - точная копия текущего процесса
  - отличается PID и PPID
  - процесс не наследует блокировки памяти
  - не наследует список сигналов, ожидающих обработки
  - не наследует таймеры
2) `exec` - замещение образа процесса (затирает память)

Атрибуты процесса
- открытые файлы
- файловые системы (mount) (для каждого процесса свой набор в общем пространстве имен - например, чтобы на сервере работало множество сайтов - для каждого процесса указывается отдельная директория - тем самым процессы не знают, что за пределами своей файловой системы)
- операции ввода-вывода (операции ввода-вывода - это асинхронный процесс, тут можно решить, кто дальше будет ждать их)
- сетевое окружение (свое пространство ip адресов)
- множество идентификаторов процессов
- память
- состояние регистров
- имя хоста (hostname)

Системный вызов `clone` позволяет сделать тоже самое что и `fork`, но задать конкретные атрибуты нового процесса, например оставить доступ к одним и тем же открытым файлам. Или общую память или поставить флаг __CLONE_PARENT__ - тогда это будет не просто потомок, а поток выполнения.

Процессы "зомби" - после завершения процесса, завершенный процесс должен отдать родителю код возврата. Если такой код никем не принимается, то процесс становится зомби и остается висеть в системе, занимая ресурсы.

Процессы __deamon__ - процессы, которые не требуют взаимодействия с пользователем и работают автономно, в бэкграунде.
Порядок создания демона
1) `fork` - создание процесса
2) в демоне перейти в корневой каталог `/` 
3) установить в демоне новый id сессии, отличный от текущего - `setsid(2)` (`man 2 setsid`)
4) закрыть файлы стандартного i/o (`close(stdin)`, `close(stdout)`, `close(stderr)`)
Общение с демоном дальше происходит через сокеты, сигналы.

### Межпроцессное взаимодействия
Виды
- файлы
- сигналы
- каналы (pipes) - именованные(имеют имя в дереве общего пространства файловых имен) и неименованные (`ps aux | grep ...` - тут пример `|` - символ неименованного канала между 2мя приложениями)
- очереди сообщений (`mqopen`, `mqsend`)
- shared memory (механизм разделяемой памяти) - выделяется специальный регион адресов, который ссылается на адресное пространство обоих процессов
- механизм сокетов (sockets)
- posix-семафоры
- rpc (`man rpc`) - удаленый вызов процедур
- ipc (system v) - старый интерфейс

#### Каналы
Неименованый канал (`man 2 pipe`) создается в буфере поток с двумя входами (по принципу `FIFO`) - на запись и на чтение. Процесс создает (клонирует себя) потомка, который обращается через файловый дескриптор к чтению. Родитель обращается через файловый дексриптор к записи.

Именованые каналы по сути то же самое, что неименованые, но с именем (`man 3 mkfifo`)

#### Сигналы
Это один из основных интерфейсов управления демонами.
У процессов и приложений есть механизм обработки сигналов. Сигналы похожи на прерывания и имеют только номер (определены в файле `<signal.h>`).
- SIGINT (2) - завершить программу
- SIGABRT (6) - завершить жестко программу (`man 3 abort`)
- SIGTERM (15) - попросить программу завершиться
- SIGKILL (9) - этот обработчик изменить нельзя - безусловно завершает программу
- SIGCHLD (17) - посылается процессу, если его потомок был завершен
`kill <pid>` - функция для отправки сигнала процессу (по дефолну это `TERM`)(`man 2 kill`)

