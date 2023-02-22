INSERT INTO departments (department_name)
VALUES ('Finance'),
       ('Human Resources'),
       ('Sales');


INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', 80000, 1),
       ('Director Human Resources', 90000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
       ('Jane', 'Doe', 2, null),
       ('John', 'Smith', 1, 1);


