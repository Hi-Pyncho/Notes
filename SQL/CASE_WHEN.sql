--Логические фукнции

CASE 
  WHEN condition_1 THEN result_1
  WHEN condition_2 THEN result_2
  [WHEN ...]
  [ELSE result_n]
END

--condition - условие, возвращающее bool
--result - результат или действие в случае с PL\pgSQL

SELECT product_name, unit_price, units_in_stock,
	CASE WHEN units_in_stock >= 100 THEN 'lots of'
		   WHEN units_in_stock >= 50 AND units_in_stock < 100 THEN 'average'
		   ELSE 'low number'
	END AS amount
FROM products
ORDER BY units_in_stock DESC

--функция date_part возвращает число (дня, месяца...)
SELECT order_id, order_date,
	CASE WHEN date_part('month', order_date) BETWEEN 3 AND 5 THEN 'spring'
		 WHEN date_part('month', order_date) BETWEEN 6 AND 8 THEN 'summer'
		 WHEN date_part('month', order_date) BETWEEN 9 AND 11 THEN 'autumn'
		 ELSE 'winter'
	END AS season
FROM orders

-- Вывести имя контакта заказчика, его город и страну, отсортировав по возрастанию по имени контакта и городу,
-- а если город равен NULL, то по имени контакта и стране. 
SELECT contact_name, city, country
FROM customers
ORDER BY contact_name,
(
	CASE WHEN city IS NULL THEN country
		 ELSE city
	END
)