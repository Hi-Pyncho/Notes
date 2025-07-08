--возвращает первый аргумент, который не равен NULL
--если все NULL, то вернет NULL
--обычно первым аргументом передают то, что возможно будет NULL, а дальше то, чем заменить
--в случае NULL
COALESCE (arg1, arg2, ...) 

SELECT order_id, order_date, COALESCE(ship_region, 'unknown') AS ship_region
FROM orders
LIMIT 10

--сравнивает два аргумента. если равны, то возвращает NULL
--а если не равны, то arg1
--например, чтобы исправить пустую строку. обычно используется в связке с COALESCE
--либо подменить одно значение другим значением
NULLIF(arg1, arg2)

SELECT contact_name, COALESCE(NULLIF(city, ''), 'Unknown') AS city
FROM customers

--Найти заказчиков, не сделавших ни одного заказа. Вывести имя заказчика и значение 'no orders' если order_id = NULL.
--с помощью ::text можно преобразовать значение в текст, так как COALESCE ожидает равные по типу значения
SELECT contact_name, COALESCE(order_id::text, 'no orders')
FROM customers
LEFT JOIN orders USING(customer_id)
WHERE order_id IS NULL

--Вывести ФИО сотрудников и их должности. В случае если должность = Sales Representative вывести вместо неё Sales Stuff.
SELECT CONCAT(last_name, ' ', first_name) AS full_name, COALESCE(NULLIF(title, 'Sales Representative'), 'Sales Stuff') AS title
FROM employees