--СОЗДАНИЕ ТАБЛИЦ

CREATE TABLE publisher
(
	publisher_id integer PRIMARY KEY,
	org_name varchar(128) NOT NULL,
	address text NOT NULL
);

CREATE TABLE book
(
	book_id integer PRIMARY KEY,
	title text NOT NULL,
	isbn varchar(32) NOT NULL
)

--СОЗДАНИЕ ТАБЛИЦЫ С РЕФЕРЕНСОМ НА ДРУГУЮ ТАБЛИЦУ
CREATE TABLE book
(
	book_id integer PRIMARY KEY,
	title text NOT NULL,
	isbn varchar(32) NOT NULL,
	fk_publisher_id integer REFERENCES publisher(publisher_id) NOT NULL
)

--УДАЛЕНИЕ ТАБЛИЦ
DROP TABLE publisher;
DROP TABLE book
DROP TABLE IF EXISTS book;

--ДОБАВЛЕНИЕ ДАННЫХ
INSERT INTO book 
VALUES 
(1, 'The Diary of a Yong Girl', '01995366'),
(2, 'Pride and Prejudice', '9780307594006'),
(3, 'The Outsider', '1501180983'),
(4, 'If It Bleeds ', '1982137975');
--либо так
INSERT INTO person VALUES (1, 'John', 'Snow');
INSERT INTO person VALUES (2, 'Ned', 'Stark');
INSERT INTO person VALUES (3, 'Rob', 'Bagratheon');

--МОДИФИКАЦИЯ ТАБЛИЦЫ
ALTER TABLE book
ADD COLUMN fk_publisher_id; --fk => FOREIGN KEY

ALTER TABLE book
ADD CONSTRAINT fk_book_publisher 
FOREIGN KEY(fk_publisher_id) 
REFERENCES publisher(publisher_id)

--ОТНОШЕНИЕ "ОДИН КО МНОГИМ" - самый частый вид отношений
--когда один издатель выпускает множество книг
--"ОДИН К ОДНОМУ" 
--когда есть таблица с именем и таблица с данными паспорта
--"МНОГИЕ КО МНОГИМ"
--когда есть таблица с книгами, есть таблица с авторами.
--у книг может быть несколько авторов и у авторов несколько книг
--создается третья таблица соответствий идентификаторов

--МНОГИЕ КО МНОГИМ(пример)
CREATE TABLE book 
{
	book_id int PRIMARY KEY,
	title text NOT NULL,
	isbn text NOT NULL
};

CREATE TABLE author
{
	author_id int PRIMARY KEY,
	full_name text NOT NULL,
	rating real
};

CREATE TABLE book_author
(
	book_id int REFERENCES book(book_id),
	author_id int REFERENCES author(author_id),
	
	CONSTRAINT book_author_pkey PRIMARY KEY (book_id, author_id) --composite key
);


---SELECT
SELECT product_id, product_name, unit_price
FROM products

---МАТЕМАТИЧЕСКИЕ ОПЕРАЦИИ
SELECT product_id, product_name, unit_price * units_in_stock
FROM products
---создаст третью таблицу с результатом умножения двух столбцов

---DISTINCT
---включить в выборку только уникальные значения в столбце
SELECT DISTINCT city
FROM employees
---уникальные сочетания
SELECT DISTINCT city, country
FROM employees

---COUNT
---считает количество строк
SELECT COUNT(*) 
FROM orders
---
SELECT COUNT(DISTINCT city) 
FROM employees

---ФИЛЬТРАЦИЯ
SELECT company_name, contact_name, phone
FROM customers
WHERE country = 'USA'
---
SELECT COUNT(*)
FROM products
WHERE unit_price < 20
---
SELECT *
FROM orders
WHERE order_date > '1998-03-01'

---CONDITIONS
SELECT *
FROM table
WHERE condition1 AND condition2
---
SELECT *
FROM table
WHERE condition1 OR condition2
---
SELECT *
FROM orders
WHERE shipped_date > '1998-04-30' AND (freight < 75 OR freight > 150)

---BETWEEN
---включая границы
SELECT COUNT(*)
FROM orders
WHERE freight BETWEEN 20 AND 40 --- ===freight >= 20 AND freight <= 40

---IN
SELECT *
FROM customers
WHERE country IN ('Mexico', 'Germany', 'USA', 'Canada')
---WHERE country = 'Mexico' OR country = 'Germany' OR country = 'Canada';

---NOT
SELECT *
FROM customers
WHERE country NOT IN ('Mexico', 'Germany', 'USA', 'Canada');

---ORDER BY
---идет после WHERE если есть
SELECT DISTINCT country
FROM customers
ORDER BY country 
--- ORDER BY country ASC (по умолчанию - по возрастанию)
--- ORDER BY country DESC (по убыванию)
SELECT DISTINCT country, city
FROM customers
ORDER BY country DESC, city ASC

--MIN MAX AVG SUM
SELECT MIN(order_date)
FROM orders
WHERE ship_city = 'London'
---
SELECT AVG(unit_price)
FROM products
WHERE discontinued != 1
---
SELECT SUM(units_in_stock)
FROM products
WHERE discontinued != 1
---
SELECT SUM(unit_price * units_in_stock)
FROM products
WHERE discontinued != 1;

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

---LIMIT
---возвращает первые N строк
---всегда в самом конце ставится
SELECT product_name, unit_price
FROM products
WHERE discontinued != 1
ORDER BY unit_price DESC
LIMIT 10

---CHECK ON  NULL
SELECT ship_city, ship_region, ship_country
FROM orders
WHERE ship_region IS NULL
---
SELECT ship_city, ship_region, ship_country
FROM orders
WHERE ship_region IS NOT NULL

---GROUP BY
SELECT ship_country, COUNT(*)
FROM orders
WHERE freight > 50
GROUP BY ship_country
ORDER BY COUNT(*) DESC
---
---чтобы указать и название, нужно исп-ть JOIN
SELECT category_id, SUM(units_in_stock)
FROM products
GROUP BY category_id
ORDER BY SUM(units_in_stock) DESC
LIMIT 5

---постфильтрация HAVING
---обычно после группировки
---до ORDER BY, но после WHERE
SELECT category_id, SUM(units_in_stock * unit_price)
FROM products
WHERE discontinued != 1
GROUP BY category_id
HAVING SUM(units_in_stock * unit_price) > 5000
ORDER BY SUM(units_in_stock * unit_price) DESC

---UNION
---объединяет и устраняет дубликаты (если нужны дубликаты => UNION ALL)
SELECT country
FROM customers
UNION 
SELECT country
FROM employees

---INTERSECT
---например, чтобы найти страны, в которых проживают и покупатели, и поставщики
SELECT country
FROM customers
INTERSECT 
SELECT country
FROM suppliers

---EXCEPT
---выбрать страны, где проживают покупатели, но где не проживают поставщики
---также устраняет дубликаты
SELECT country
FROM customers
EXCEPT
SELECT country
FROM suppliers


---СОЕДИНЕНИЯ между pk_key and fk_key
---левая табличка - первая LEFT
---правая табличка - вторая RIGHT
---INNER JOIN (кратко JOIN) (в правой fk_key, из левой таблицы берутся только те данные, которые есть в fk_key правой таблицы)
---LEFT OUTER JOIN (в результат попадают все данные левой таблицы, и часть правой)
---FULL OUTER JOIN = LEFT + RIGHT (берутся все данные из двух таблиц)
---алгоритм FULL => 1)inner join 2)left outer join 3)right outer join
---CROSS JOIN (декартово соединение) - берется все данные левой таблицы и по порядку добавляются данные правой таблицы (исп-ся редко)
---
---если имена из разных таблиц совпадают, можно обращаться к столбцам через точку
SELECT product_name, suppliers.company_name, units_in_stock
FROM products
INNER JOIN suppliers ON products.supplier_id = suppliers.supplier_id
ORDER BY units_in_stock DESC
---
SELECT category_name, SUM(units_in_stock)
FROM products
INNER JOIN categories ON products.category_id = categories.category_id
GROUP BY category_name
ORDER BY SUM(units_in_stock) DESC
LIMIT 5
---
SELECT category_name, SUM(units_in_stock * unit_price)
FROM products
INNER JOIN categories ON products.category_id = categories.category_id
WHERE discontinued != 1
GROUP BY category_name
HAVING SUM(units_in_stock * unit_price) > 5000
ORDER BY SUM(units_in_stock * unit_price) DESC
---
SELECT contact_name, company_name, phone, first_name, last_name, 
	   title, order_date, product_name, ship_country, products.unit_price,
	   quantity, discount
FROM orders
JOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON order_details.product_id = products.product_id
JOIN customers ON orders.customer_id = customers.customer_id
JOIN employees ON orders.employee_id = employees.employee_id
WHERE ship_country = 'USA'




