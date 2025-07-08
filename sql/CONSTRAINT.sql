---PRIMARY KEY
--гарантирует, что мы не может вставить дубликат или NULL
--можно комбинировать с serial
--почти эквивалент UNIQUE NOT NULL
--разница в том, что PRIMARY KEY лишь один на всю таблицу
--а UNIQUE NOT NULL может быть наложено более чем на одну колонку

---CONSTRAINT
--посмотреть ограничения
SELECT constraint_name
FROM information_schema.key_column_usage
WHERE table_name = 'chair'
	AND table_schema = 'public'
	AND column_name = 'chair_id'
--результат => chair_chair_id_key
--формируется по шаблону TABLE_COLUMN_NAME_KEY
--удалить ограничение можно так
ALTER TABLE chair
DROP CONSTRAINT chair_chair_id_key
--или добавлять
ALTER TABLE chair
ADD PRIMARY KEY (chair_id)

---FOREIGN KEY
--если мы создадим такие таблицы без добавления внешнего ключа
--то можно будет вставлять любые id во вторую таблицу. что нехорошо
CREATE TABLE publisher
(
	publisher_id int,
	publisher_name varchar(128) NOT NULL,
	address text,
	
	CONSTRAINT PK_publisher_publisher_id PRIMARY KEY (publisher_id)
);

CREATE TABLE book
(
	book_id int,
	title text NOT NULL,
	isbn varchar(32) NOT NULL,
	publisher_id int,
	
	CONSTRAINT PK_book_book_id PRIMARY KEY (book_id)
)
--поэтому очистить таблицу и добавить FOREIGN KEY
ALTER TABLE book
ADD CONSTRAINT FK_books_publisher FOREIGN KEY (publisher_id) REFERENCES publisher (publisher_id)
--поэтому лучше задавать сразу при создании таблицы
CREATE TABLE book
(
	book_id int,
	title text NOT NULL,
	isbn varchar(32) NOT NULL,
	publisher_id int,
	
	CONSTRAINT PK_book_book_id PRIMARY KEY (book_id),
	CONSTRAINT FK_book_publisher FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
)

---Ограничение DEFAULT
--самостоятельно вставляет значение, если не указать явно
CREATE TABLE customer
(
	customer_id serial,
	full_name text,
	status char DEFAULT 'r',
	
	CONSTRAINT PK_customer_customer_id PRIMARY KEY (customer_id),
	CONSTRAINT CHK_customer_status CHECK (status = 'r' OR status = 'p')
)
--чтобы отменить такое поведение, нужно прописать
ALTER TABLE table_name
ALTER COLUMN column_name DROP DEFAULT
--и вернуть
ALTER TABLE table_name
ALTER COLUMN column_name SET DEFAULT 'r'