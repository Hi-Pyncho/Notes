## Wget
`wget https://link.com` - скачать в текущую директорию    
`wget https://link.com -P dir_path` - скачать в нужную директорию под дефолтным именем  
`wget https://link.com -O dir_to_file` - скачать в нужную директорию под нужным именем  
`wget -c https://link.com` - докачать файл по ссылке в случае обрыва связи   
`wget --spider https://link.com` - проверить доступность файла по ссылке  
`wget -i text_file_with_links.txt` - скачать несколько файлов по ссылкам из текстового файла  
`wget --spider -i text_file_with_links.txt` - проверить на доступность несколько файлов по ссылкам из текстового файла  
`wget -r -l 1 -A jpg https://link.com` - пройти на страницу и скачать все картинки формата jpeg с глубиной 1 (сохраняя файловую структуру)
