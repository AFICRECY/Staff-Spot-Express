DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE allDepartments (
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);


CREATE TABLE allRoles (
    roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    ON DELETE SET NULL
);

CREATE TABLE allEmployees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(30), NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    manager VARCHAR(30),
    ON DELETE SET NULL
);




