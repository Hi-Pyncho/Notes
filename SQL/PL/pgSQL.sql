CREATE FUNCTION func_name ([arg1, arg2, ...]) RETURNS data_type AS $$
BEGIN
--logic
END
$$ LANGUAGE plpgsql

--преимущества
---создание переменных
---прогон циклов и развитая логика
---возврат значения через КУЕГКТ (вместо SELECT) или RETURN QUERY (в дополнение к SELECT)

--
CREATE OR REPLACE FUNCTION get_total_number_of_goods() RETURNS bigint AS $$
BEGIN
	RETURN sum(units_in_stock)
	FROM products;
END
$$ LANGUAGE plpgsql

SELECT get_total_number_of_goods()

--переменные
CREATE OR REPLACE FUNCTION get_price_boundaries(OUT max_price real, OUT min_price real) AS $$
BEGIN
	--max_price := MAX(unit_price) FROM products;
	--min_price := MIN(unit_price) FROM products;
  --чтобы два раза не проходиться по базе, делаем так
	SELECT MAX(unit_price), MIN(unit_price)
	INTO max_price, min_price
	FROM products;
END
$$ LANGUAGE plpgsql

--обычная функция

CREATE OR REPLACE FUNCTION get_sum (x int, y int, OUT result int) AS $$
BEGIN
  --можно не :=, а просто =
  --но чтобы разделить присвоение и сравнение можно добавлять :
	result := x + y;
END
$$ LANGUAGE plpgsql

--QUERY
CREATE OR REPLACE FUNCTION get_customers_by_country(customer_country varchar) RETURNS SETOF customers AS $$
BEGIN
	RETURN QUERY
	SELECT *
	FROM customers
	WHERE country = customer_country;
END
$$ LANGUAGE plpgsql