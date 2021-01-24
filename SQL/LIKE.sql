---Pattern matching LIKE
% - placeholder(заполнитель) означающий 0, 1 и более символов
_ - ровно один любой символ
---пример
LIKE 'U%' - строки, начинающиеся с U
LIKE '%a' - заканчивается на а
LIKE '%John%'
LIKE 'J%n'
LIKE '_oh_'
LIKE '_oh%'
---
SELECT last_name, first_name
FROM employees
WHERE first_name LIKE '%n'