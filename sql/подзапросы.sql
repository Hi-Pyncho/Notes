---ПОДЗАПРОСЫ
---обычно можно заменить на JOIN. Смотреть, что производительней и читабельней
SELECT company_name
FROM suppliers
WHERE country IN (SELECT DISTINCT country
			      			FROM customers)
---эквивалент с JOIN (но такое не всегда возможно)
SELECT DISTINCT suppliers.company_name
FROM suppliers
JOIN customers USING(country)
---можно также джойнить подзапросы
SELECT customer_id, SUM (freight) AS freight_sum
FROM orders
JOIN (
	SELECT customer_id, AVG (freight) AS freight_avg
	FROM orders
	GROUP BY customer_id
) oa
USING (customer_id)
WHERE freight > freight_avg AND shipped_date BETWEEN '1996-07-16' AND '1996-07-31'
GROUP BY customer_id
ORDER BY freight_sum;
---
SELECT category_name, SUM(units_in_stock) AS units_sum
FROM categories
JOIN products USING (category_id)
GROUP BY category_name
ORDER BY units_sum DESC
LIMIT (SELECT MIN(product_id) + 4 FROM products)
---
SELECT product_name, units_in_stock
FROM products
WHERE units_in_stock > (SELECT AVG(units_in_stock) FROM products);
---
SELECT DISTINCT product_name
FROM products
JOIN order_details USING (product_id)
WHERE quantity > (
	SELECT AVG(quantity)
	FROM order_details
)

---WHERE EXISTS (NOT)
-- выбирает тех заказчиков, где WHERE EXISTS веренет true
SELECT company_name, contact_name
FROM customers
WHERE EXISTS (SELECT customer_id FROM orders 
							WHERE customer_id = customers.customer_id 
							AND freight 
							BETWEEN 50 AND 100)
---
SELECT company_name, contact_name
FROM customers
WHERE NOT EXISTS (SELECT order_date 
			  FROM orders 
			  WHERE customer_id = customers.customer_id 
			  AND order_date BETWEEN '1995-07-04' AND '1995-07-15');
---
SELECT product_name
FROM products
WHERE NOT EXISTS (SELECT orders.order_id 
				  FROM orders 
				  JOIN order_details USING(order_id)
				  WHERE order_details.product_id = product_id
				  AND order_date BETWEEN '1995-02-01' AND '1995-02-15')

---ANY, ALL
--ANY - если совпадает хотя бы один из выборки
SELECT DISTINCT company_name
FROM customers
WHERE customer_id = ANY (
	SELECT customer_id
	FROM orders
	JOIN order_details USING (order_id)
	WHERE quantity > 40
);
---эквивалентно, но этот более читаемый
SELECT DISTINCT company_name
FROM customers
JOIN orders USING(customer_id)
JOIN order_details USING(order_id)
WHERE quantity > 40
ORDER BY company_name
---ALL
--если совпадают все значения
--например тут надо найти количество, которое больше ВСЕХ средних значений из выборки
SELECT DISTINCT product_name, quantity
FROM products
JOIN order_details USING (product_id)
WHERE quantity > ALL (
	SELECT AVG(quantity)
	FROM order_details
	GROUP BY product_id
)
ORDER BY quantity