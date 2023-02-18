DROP DATABASE IF EXISTS personel_db;
CREATE DATABASE personel_db;

USE personel_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT, 
  PRIMARY KEY(id),
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(id),
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,
  manager_id INT NOT NULL
);