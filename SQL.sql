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