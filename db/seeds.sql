INSERT INTO Departments (dept_id, dept_name)
VALUES (1, "Sales"),
    (2, "Human Resources"),
    (3, "Engineering"),
    (4, "Finance");





INSERT INTO  roles (role_id, title, department, salary)
VALUES (1, "Sales Lead", "Sales", "100000"),
    (2, "Salesperson", "Sales", "80000"),
    (3, "HR Director", "Human Resources", "130000"),
    (4, "HR Sepecialist", "Human Resources", "80000"),
    (5, "Senior Software Engineer", "Engineering", "250000"),
    (6, "Associate Software Engineer", "Engineering", "100000"),
    (7, "Finance Director", "Finance", "140000"),
    (8, "Accountant", "Finance", "90000");



INSERT INTO  employees (employee_id, firstName, lastName, title, department, salary, manager)
VALUES (1, "Naomi", "Johnson", "Sales Lead", "Sales", "100000", Null),
    (2, "Marcus", "White", "Salesperson", "Sales", "80000", "Sara Grace"),
    (3, "Aktunde", "Ahmad" "HR Director", "Human Resources", "130000", Null),
    (4, "Jamar", "Sanders", "HR Sepecialist", "Human Resources", "80000", "Aktunde Ahmad"),
    (5, "Tamika", "Johnson", "Senior Software Engineer", "Engineering", "250000", Null),
    (6, "Rashon", "Davis", "Associate Software Engineer", "Engineering", "100000", "Tamika Johnson"),
    (7, "Marques", "Houston", "Finance Director", "Finance", "140000", Null),
    (8, "Salim" "Gupta" "Accountant", "Finance", "90000", "Marques Houston");