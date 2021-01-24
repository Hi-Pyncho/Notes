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

---LEFT JOIN
---например, выбрать компании, на которых не висят заказы
SELECT company_name, order_id
FROM customers
LEFT JOIN orders ON orders.customer_id = customers.customer_id
WHERE order_id IS NULL

---SELF JOIN
---нужен чтобы построить иерархическое отношение между данными
---здесь один id ссылается на id этой же таблицы
CREATE TABLE employee (
	employee_id INT PRIMARY KEY,
	first_name VARCHAR (255) NOT NULL,
	last_name VARCHAR (255) NOT NULL,
	manager_id INT,
	FOREIGN KEY (manager_id) REFERENCES employee (employee_id)
)
---
---даем псевдонимы
SELECT e.first_name || ' ' || e.last_name AS employee,
			 m.first_name || ' ' || m.last_name AS manager
FROM employee e
LEFT JOIN employee m ON m.employee_id = e.manager_id
ORDER BY manager

---USING
---сокращение записей
SELECT contact_name, company_name, phone, first_name, last_name, 
	   title, order_date, product_name, ship_country, products.unit_price,
	   quantity, discount
FROM orders
JOIN order_details USING(order_id) --- orders.order_id = order_details.order_id
JOIN products USING(product_id) --- order_details.product_id = products.product_id
JOIN customers USING(customer_id) --- orders.customer_id = customers.customer_id
JOIN employees USING(employee_id) --- orders.employee_id = employees.employee_id
WHERE ship_country = 'USA'