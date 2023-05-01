INSERT INTO department (id, department_name) VALUES 
(1, 'Sales'),
(2, 'Human Resources'),
(3, 'Engineering'),
(4, 'Finance');

-- populate role table
INSERT INTO role (id, title, salary, department_id) VALUES 
(1, 'Manager', 100000, 1),
(2, 'Sales Representative', 50000, 1),
(3, 'Marketing Manager', 100000, 2),
(4, 'Marketing Specialist', 60000, 2),
(5, 'Software Engineer', 150000, 3),
(6, 'Associate Engineer', 95000, 3),
(7, 'Product Designer', 70000, 4);

-- populate employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
(1, 'Naomi', 'Johnson', 1, NULL),
(2, 'Marcus', 'White', 2, 1),
(3, 'Aktunde', 'Ahmad', 5, NULL),
(4, 'Tamika', 'Johnson', 6, NULL),
(5, 'Rashon', 'Davis', 7, 4),
(6, 'Marques', 'Houston', 7, 4),
(7, 'Salim', 'Gupta', 7, 4),
(8, 'Jamar', 'Sanders', 7, 4);
