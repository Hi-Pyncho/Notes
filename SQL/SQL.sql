--СОЗДАНИЕ ТАБЛИЦ

CREATE TABLE publisher
(
	publisher_id integer PRIMARY KEY,
	org_name varchar(128) NOT NULL,
	address text NOT NULL
);

--СОЗДАНИЕ ТАБЛИЦЫ С РЕФЕРЕНСОМ НА ДРУГУЮ ТАБЛИЦУ
CREATE TABLE book
(
	book_id integer PRIMARY KEY,
	title text NOT NULL,
	isbn varchar(32) NOT NULL,
	fk_publisher_id integer REFERENCES publisher(publisher_id) NOT NULL
)

--создание таблицы на основе другой таблицы
SELECT *
INTO best_authors
FROM author
WHERE rating >= 4.5

--если нужно добавить туда данных, польуземся таким синтаксисом
INSERT INTO best_authors
SELECT * 
FROM author
WHERE rating > 4

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
(
	book_id int PRIMARY KEY,
	title text NOT NULL,
	isbn text NOT NULL
);

CREATE TABLE author
(
	author_id int PRIMARY KEY,
	full_name text NOT NULL,
	rating real
);

CREATE TABLE book_author
(
	book_id int REFERENCES book(book_id),
	author_id int REFERENCES author(author_id),
	--здесь даем имя ограничению. если не задать, то генерируется автоматически
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


---DDL (data definition language)
---часть синтаксиса, отвечающая за структуру таблицы
CREATE TABLE table_name
ALTER TABLE table_name
...ADD COLUMN column_name data_type
...RENAME TO new_talbe_name
...RENAME old_column_name TO new_column_name
...ALTER COLUMN column_name SET DATA TYPE data_type
...DROP COLUMN column_name
DROP TABLE table_name
TRUNCATE TABLE table_name ---(удаляет не таблицы, а все данные из таблицы)
--когда мы пишем DELETE, то СУБД пишет логи по удалениям, по TRUNCATE не пишет - жесткая команда
-- но не может удалить данные, на которые есть ссылки из других таблиц
--не рестартит identity (если был прописан тип данных serial, не сбросит, а продолжит)
--чтобы сбросил, нужно сделать так
TRUNCATE TABLE table_name RESTART IDENTITY


---Логические ограничения CHECK
ALTER TABLE book
ADD COLUMN price decimal CONSTRAINT CHK_book_price CHECK (price >= 0)




--UPDATE
UPDATE author
SET full_name = 'Lias', rating = 5
WHERE author_id = 1

--DELETE
DELETE FROM author
WHERE rating < 4.5
--удалить все строки (пишет логи)
--TRUNCATE чуть быстрее и логи не пишет
DELETE FROM author

--RETURNING (что-то вроде логов)
--так мы можем в output отправлять нужные данные
INSERT INTO book (title, isbn, publisher_id)
VALUES ('title', 'isbn', 3)
RETURNING book_id
--также можно исполнять при UPDATE, DELETE...
UPDATE author
SET full_name = 'walter', rating = 5
WHERE author_id = 1
RETURNING *
--
DELETE FROM author
WHERE author_id = 1
RETURNING *