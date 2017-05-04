CREATE DATABASE nmldb;

CREATE USER nml@localhost IDENTIFIED BY 'nml177';
GRANT ALL PRIVILEGES ON nmldb.* TO nml@localhost;
FLUSH PRIVILEGES;

use nmldb;
drop table  if exists answers;
drop table  if exists questionnare;
drop table  if exists employees;


CREATE TABLE questionnare (question_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
question VARCHAR(100),
employee_id int,
   foreign key (employee_id) references employees(employee_id));

CREATE TABLE employees (employee_id INT NOT NULL  AUTO_INCREMENT,
name VARCHAR(20),
password VARCHAR(100),
email VARCHAR(100),
PRIMARY KEY (employee_id)
);

CREATE TABLE answers (answers_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
answer VARCHAR(100),
question_id int,foreign key (question_id) references questionnare(question_id),
employee_id int,foreign key (employee_id) references employees(employee_id)
);
