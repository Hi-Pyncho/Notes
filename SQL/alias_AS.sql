---ПСЕВДОНИМ AS (алиасы)
---эти колонки нельзя использовать в WHERE и HAVING, так как WHERE отрабатывает перед SELECT
SELECT COUNT(*) AS epmployees_count
FROM employees
---
SELECT COUNT(DISTINCT country) AS country
FROM employees
---но можно в GROUP BY и ORDER BY
SELECT category_id, SUM(units_in_stock) AS units_in_stock
FROM products
GROUP BY category_id
ORDER BY units_in_stock DESC
LIMIT 5
---
SELECT category_id, SUM(unit_price * units_in_stock) AS total_price
FROM products
WHERE discontinued != 1
GROUP BY category_id
HAVING SUM(unit_price * units_in_stock) > 5000
ORDER BY total_price DESC
---CONCAT AND AS
SELECT c.company_name, CONCAT(first_name, ' ', last_name) AS employee
FROM orders AS o
JOIN employees AS e USING(employee_id)
JOIN customers AS c USING(customer_id)
JOIN shippers AS s ON s.shipper_id = o.ship_via
WHERE e.city = 'London' 
AND c.city = 'London' 
AND s.company_name = 'Speedy Express';