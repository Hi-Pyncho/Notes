Представления
View - это сохраненный запрос в видео объекта БД(виртуальная таблица)
К view можно делать обычный SELECT
Views можно соединять(JOIN) и т.д.
производительность такая же, как и у обыной таблицы
Позволяет делать кеширование с помощью материализации
Позволяет сокращать сложные запросы (декомпозиция сложного запроса в несколько простых)
Позволяет подменить реальную таблицу
Позволяет создавать виртуальные таблицы соединяющие несколько таблиц
Позволяет скрыть логику агрегации данных при работе через ORM
Позволяет скрыть информацию (столбцы) от групп пользователей
Позволяет скрыть информацию на уровне строк от групп пользователей (строки отсекаются самим запросом)

По типу делятся на:
- Временные
- Рекурсивные
- Обновляемые
- Материализуемые

CREATE VIEW view_name AS
SELECT select_statement

Изменение представлений
- Можно добавить только новые столбцы
- Нельзя удалить существующие столбцы
- Нельзя поменять имена столбцов
- Нельзя поменять даже порядок следования столбцов

CREATE OR REPLACE view_name AS
SELECT select_statement

Но можно переименовывать сами представления
ALTER VIEW old_view_name RENAME TO new_view_name

Модификация данных через представления
- Только одна таблица в FROM
- Нет DISTINCT, GROUP BY, HAVING, UNION, INTERSECT, EXCEPT, LIMIT
- Нет MIN MAX SUM COUNT AVG
- WHERE не под запретом

ПРИМЕРЫ
CREATE VIEW products_suppliers_categories AS
SELECT product_name, quantity_per_unit, unit_price, units_in_stock,
company_name, contact_name, phone, category_name, description
FROM products
JOIN suppliers USING (supplier_id)
JOIN categories USING (category_id)

SELECT *
FROM products_suppliers_categories
WHERE unit_price > 20
ORDER BY unit_price DESC

DROP VIEW IF EXISTS products_suppliers_categories


Модификация существующей VIEW
CREATE VIEW heavy_orders AS
SELECT *
FROM orders
WHERE freight > 50
--меняем
CREATE OR REPLACE VIEW heavy_orders AS
SELECT *
FROM orders
WHERE freight > 100
--можно сохранить старый VIEW перед изменением
ALTER VIEW heavy_orders RENAME TO ho_old


Можно вставлять новые строки
INSERT INTO heavy_orders
VALUES (some_data_values)

Можно удалять строки
DELETE FROM heavy_orders
WHERE freight < 100.7
RETURNING freight

Если мы создали VIEW, где freight > 100 и заинсертим туда строчку, где freight < 100
то во VIEW она не появится. Но появится там, откуда этот VIEW родом
поэтому добавляем локальную проверку
CREATE OR REPLACE VIEW copy_products AS
SELECT *
FROM products
WHERE unit_price > 50
ORDER BY unit_price DESC
WITH LOCAL CHECK OPTION
--либо 
WITH LOCAL CHECK OPTION
-- такая проверка будет создавать для подлежащих VIEWS