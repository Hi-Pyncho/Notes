---ПОСЛЕДОВАТЕЛЬНОСТИ (sequences) как работает serial
CREATE SEQUENCE seq1;
---0
SELECT nextval('seq1')
---1
SELECT currval('seq1')
---1
SELECT lastval()
---1

SELECT setval('seq1', 16)
---по умолчанию 3-e значение true
SELECT currval('seq1')
--16
SELECT nextval('seq1')
--17

CREATE SEQUENCE IF NOT EXISTS seq2 INCREMENT 16
SELECT currval('seq2')
--текущее значение (currval) для последовательности "seq2" ещё не определено в этом сеансе
SELECT nextval('seq2')
--1
SELECT nextval('seq2')
--17

CREATE SEQUENCE IF NOT EXISTS seq3
INCREMENT 16
MINVALUE 0
MAXVALUE 128
START WITH 0

SELECT nextval('seq3')
--0
--переименовать
ALTER SEQUENCE seq3 RENAME TO seq4
--рестарт
ALTER SEQUENCE seq4 RESTART WITH 16

SELECT nextval('seq4')
--16
--удалить
DROP SEQUENCE seq4

--если в таблице назначено int а не serial, можно установить seq
--и все это эквивалентно, если бы мы просто поставили serial
--так можно добавить автоинкремент в колонку таблицы с нужного числа
CREATE SEQUENCE IF NOT EXISTS book_book_id_seq
START WITH 1 OWNED BY book.book_id
--и добавить в таблицу
ALTER TABLE book
ALTER COLUMN book_id SET DEFAULT nextval('book_book_id_seq')
--но может появиться ошибка
--нулевое значение в столбце "book_id" нарушает ограничение NOT NULL
-- поэтому нужно установить DEFAULT для колонки book_id
ALTER TABLE book
ALTER COLUMN book_id SET DEFAULT nextval('book_book_id_seq')
--минус serial в том, что можно вставить любую цифру и это сломает счетчик
--поэтому можно воспоользоваться новым способом с версии postgres 10
book_id int GENERATED ALWAYS AS IDENTITY NOT NULL
--плюс можно добавить тут же опции
book_id int GENERATED ALWAYS AS IDENTITY (START WITH 10 INCREMENT BY 2) NOT NULL
--и это можно обойти с помощью команды
INSERT INTO book 
OVERRIDING SYSTEM VALUE
VALUES 
(3, 'title', '1234', 1)