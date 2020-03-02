DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department
(
    id INT NOT NULL AUTO_INCREMENT ,
    department_name VARCHAR (50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employees
(
    id INT NOT NULL AUTO_INCREMENT ,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_role
(
    id INT NOT NULL AUTO_INCREMENT ,
    title VARCHAR (50) NOT NULL,
    salary DECIMAL(50) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);




