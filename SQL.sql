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