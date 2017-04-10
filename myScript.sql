use nmldb;
drop table  if exists employees;
drop table  if exists questionnare;
drop table  if exists answers;


CREATE TABLE questionnare (question_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
question VARCHAR(100));

CREATE TABLE employees (employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(20),
surname VARCHAR(20),
password VARCHAR(100),
confirmPassword VARCHAR(100),
email VARCHAR(100),
question_id int,foreign key (question_id) references questionnare(question_id));

CREATE TABLE answers (answers_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
question VARCHAR(100),
question_id int,foreign key (question_id) references questionnare(question_id),
employee_id int,foreign key (employee_id) references employees(employee_id)
);