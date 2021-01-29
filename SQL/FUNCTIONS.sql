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