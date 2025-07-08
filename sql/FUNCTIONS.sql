--фукнцие(хранимые процедуры) - компилируемы и хранятся на стороне БД. А потому их вызов стоит дешево
--разграничение работы frontend и server-side dev
--хранить код который работает с кортежами логичнее ближе к данным (SRP)
--переиспользуемость функций разными клиентскими приложениями
--управление безопасностью через регулирование доступа к функциям
--уменьшение трафика на сеть

--Функции в Postgres
---могут содержать SELECT, INSERT, UPDATE, DELETE (CRUD - create, read, update, delete)
---не могут содержать COMMIT, SAVEPOINT (TCL), VACUUM (utility)
---деляется на SQL-функции, процедурные (PL/pgSQL - основной диалект), серверныу функции (на C), собственные ф-ции

--вместо $$ до 8-й версии использовались кавычки
CREATE FUNCTION func_name([arg1, arg2...]) RETURN data_type AS $$
...logic...
$$ LANGUAGE lang

--модифицирует уже существующую фукнцию с таким же названием
CREATE OR REPLACE func_name ...

--удалить
DROP FUNCTION get_avg_price_of_goods()

--примеры
CREATE OR REPLACE FUNCTION fix_customer_region() RETURNS void AS $$
	UPDATE tmp_customers
	SET region = 'unknown'
	WHERE region is NULL
$$ LANGUAGE SQL
--и вызываем ф-цию
SELECT fix_customer_region()

--Скалярные функции. Возвращает одно значение
CREATE OR REPLACE FUNCTION get_total_number_of_goods() RETURNS bigint AS $$
	SELECT SUM(units_in_stock) 
	FROM products
$$ LANGUAGE SQL

SELECT get_total_number_of_goods() AS total_goods


--фукнции с аргументами
IN -- входящий аргумент
OUT -- исходящие аргументы
INOUT -- и входящий и исходящий аргументы (не рекомендуется)
VARIADIC --вмассив входящих параметров
DEFAULT value --значение по умолчанию

--примеры
--здесь неявно принимаются IN параметры
CREATE OR REPLACE FUNCTION get_product_price_by_name(prod_name varchar) RETURNS real AS $$
	SELECT unit_price
	FROM products
	WHERE product_name = prod_name
$$ LANGUAGE SQL

SELECT get_product_price_by_name('Chocolade') AS price

--
CREATE OR REPLACE FUNCTION get_price_boundaries(OUT max_price real, OUT min_price real) AS $$
	--в том же порядке, в котором и заносились OUT аргументы
	SELECT MAX(unit_price), MIN(unit_price)
	FROM products
$$ LANGUAGE SQL

SELECT get_price_boundaries() --(263.5,2.5)
SELECT * FROM get_price_boundaries() --в разных колонках 263.5 | 2.5

--IN и OUT
CREATE OR REPLACE FUNCTION get_price_boundaries_by_discontinuity(IN is_discontinued int, OUT max_price real, OUT min_price real) AS $$
	--в том же порядке, в котором и заносились OUT аргументы
	SELECT MAX(unit_price), MIN(unit_price)
	FROM products
	WHERE discontinued = is_discontinued
$$ LANGUAGE SQL

SELECT * FROM get_price_boundaries_by_discontinuity(1)

--DEFAULT
CREATE OR REPLACE FUNCTION get_price_boundaries_by_discontinuity(is_discontinued int DEFAULT 1, OUT max_price real, OUT min_price real) AS $$
	--в том же порядке, в котором и заносились OUT аргументы
	SELECT MAX(unit_price), MIN(unit_price)
	FROM products
	WHERE discontinued = is_discontinued
$$ LANGUAGE SQL
--без параметров
SELECT * FROM get_price_boundaries_by_discontinuity()

--возврат множества строк
RETURNS SETOF data_type -- возврат n-значений типа data-data_type
RETURNS SETOF table -- если нужно вернуть все столбцы из таблица или пользовательского типа
RETURNS SETOF record -- только когда типы колонок в результирующем наборе заранее неизвестны
RETRUNS TABLE (column_name data_type, ...) -- тоже что и setof table, 
--но имеем возможность явно указывать возвращаемые столбцы 
Возврат через OUT-параметры --возврат одной строки с нельскими значениями

--примеры
CREATE OR REPLACE FUNCTION get_average_prices_by_prod_categories()
	RETURNS SETOF double precision AS $$
		SELECT AVG(unit_price)
		FROM products
		GROUP BY category_id
$$ LANGUAGE SQL

SELECT * FROM get_average_prices_by_prod_categories() AS average_prices

--
CREATE OR REPLACE FUNCTION get_avg_prices_by_prod_categories (OUT sum_price real, OUT avg_price float8) 
	RETURNS SETOF RECORD AS $$ --позволяет возвращать несколько строк, когда есть аргументы. без него вернет одну строку
		SELECT SUM(unit_price), AVG(unit_price)
		FROM products
		GROUP BY category_id
$$ LANGUAGE SQL
--можно выбрать один параметр
SELECT sum_price FROM get_avg_prices_by_prod_categories()
--или несколько, задав колонкам имена
SELECT sum_price AS sum, avg_price AS avg FROM get_avg_prices_by_prod_categories()

--
--если убрать OUT параметры, то нужно будет вызывать имена и типы на этапе вызова самой функции
--и лучше такого избегать
CREATE OR REPLACE FUNCTION get_avg_prices_by_prod_categories() 
	RETURNS SETOF RECORD AS $$ --позволяет возвращать несколько строк, когда есть аргументы. без него вернет одну строку
		SELECT SUM(unit_price), AVG(unit_price)
		FROM products
		GROUP BY category_id
$$ LANGUAGE SQL

SELECT * FROM get_avg_prices_by_prod_categories() AS (sum_price real, avg_price float8)

--RETURNS TABLE
CREATE OR REPLACE FUNCTION get_customers_by_country (customer_country varchar)
	RETURNS TABLE(char_code char, company_name varchar) AS $$
		SELECT customer_id, company_name
		FROM customers
		WHERE country = customer_country
$$ LANGUAGE SQL

SELECT * FROM get_customers_by_country('Mexico')

--RETURNS SETOF table_name
CREATE OR REPLACE FUNCTION get_customers_by_country (customer_country varchar)
	RETURNS SETOF customers AS $$
	--не будет работать SELECT company_name, contact_name...
		SELECT *
		FROM customers
		WHERE country = customer_country
$$ LANGUAGE SQL

SELECT get_customers_by_country('Mexico') --выдаст одной строкой
SELECT company_name FROM get_customers_by_country('Mexico') --выборка по конкретному столбцу
SELECT * FROM get_customers_by_country('Mexico') --выдаст таблицу