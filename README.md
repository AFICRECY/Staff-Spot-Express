# 🔎 Staff Spot Express 🔎
## (Command Line Employee Database)

<p>&nbsp;</p>

## Technology Used:
| Technology Used         | Resource URL           |
| ------------- |:-------------:|
| Git | [https://git-scm.com/](https://git-scm.com/)     |
| JavaScript  | [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://developer.mozilla.org/en-US/docs/Web/JavaScript)      |
| Node.js | [https://nodejs.org/en](https://nodejs.org/en)      |
|  SQL   |    [https://www.mysql.com/](https://www.mysql.com/)   |
| Figlet   |    [https://www.npmjs.com/package/figlet](https://www.npmjs.com/package/figlet)    | 


<p>&nbsp;</p>

## Description:

Watch Functionality Video: [https://drive.google.com/file/d/1jjubrtASBkf53vuNRsMXTtPOpCbEP6lZ/view]

A healthy company culture can be fostered through the use of effective employee database software. The use of effective employee database software can lead to improved employee engagement and decreased workplace frustration. This is due to the instant, secure, and controlled access employees have to their own records. Proper maintenance of these records also contributes to greater data security, as the software builds a strong system that prevents the misuse of information. Moreover, employee database software enables companies to establish a well-defined organizational structure through the inclusion of custom entities. Businesses can tailor their workforce according to their specific needs and remain current with compliance updates.

This application brings together different kinds of software and associated packages to create an employee database called Staff Spot Express. Staff Spot Express allows the user to, through the command line, enter “node server.js”, and have access to their company departments in table format, an employee list in table format, employee roles, salary amounts, as well as providing the employees supervisor. Not only can the user have access to this information, they are able to easily add an employee, add a role, add a department, and update an employee/role. Once the user enters the initiating commands to their terminal, they have access to their company database. 

<p>&nbsp;</p>

## Table of Contents:
* Installation (JavaScript, Node.js, NPM Packages, Template Literals, Arrow Functions, Inquirer, SQL Database, Objects, and Functions)
* Usage
* Credits
* License

<p>&nbsp;</p>

## Installation:

To install this project, a knowledge of JavaScript, Node.js, and NPM Packages were required. I had to first install Node.js to my computer and then install the NPM and Inquirer packages. The Inquirer package provides a set of tools for building command-line interfaces (CLIs). It gave me the ability to create interactive prompts for users allowing them to view departments, view employee roles, view employee lists, salary amounts, employee’s managers, and the ability to prompt the user to add, and update a department, employee, or role through the command line. Methods used ranged from, Template Literals, Arrow Functions, Inquirer, Objects, and Functions, Variables, and If/Else Statements. MySQL framework was downloaded and that enabled me to create a database, create multiple tables in that database and seed those tables with data about the company employees, their managers, their salaries, and their roles. Additionally, I used the Figlet npm package add on, which gave me the ability to decorate the top of the database with the database name. 

The web application is intended for the user to be able to open their integrated terminal, input “node server.js” into the command line, and immediately, through the terminal, be prompted with access to the company database as well as a list of options on viewing tables or manipulating that company data as they see fit. The code below makes this happen. 

<p>&nbsp;</p>

### Multiple-Row INSERT" statement,
```
INSERT INTO department (id, department_name) VALUES
(1, 'Sales'),
(2, 'Human Resources'),
(3, 'Engineering'),
(4, 'Finance');
```
(Above: This code is an SQL (Structured Query Language) statement that inserts multiple rows of data into a table called "department". The table has two columns: "id" and "department_name".)


<p>&nbsp;</p>

### Creating a Database/Creating a Table in that Database

```
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;


USE employee_db;


CREATE TABLE department (
   id INT AUTO_INCREMENT PRIMARY KEY,
   department_name VARCHAR(30) NOT NULL
);
```
(Above: The first line drops the database "employee_db" if it already exists. The second line creates the new database, "employee_db", and the "department" table will be created within it. This table is used to store department data, with each row representing a single department and its associated "id" and "department_name".)


<p>&nbsp;</p>

### Connecting to MySQL Database
```
const db = mysql.createConnection(
 {
   host: "localhost",
   // MySQL username,
   user: "root",
   password: "password",
   database: "employee_db",
 },
 console.log(`Connected to the employee_db database.`)
);
```
(Above: This code creates a connection to a MySQL database named "employee_db". It uses the "mysql" package to create a connection object called "db" with the following properties: host, user, password, and database.)


<p>&nbsp;</p>

### NPM Figlet Package 
```
var figlet = require("figlet");


figlet("Staff Spot Express", function (err, data) {
 if (err) {
   console.log("Something went wrong...");
   console.dir(err);
   return;
 }
 console.log(data);
});

```
(Above: Calling the Figlet object as a function is shorthand for calling the text function. This method allows you to create ASCII Art from text.)


<p>&nbsp;</p>

### User Prompt List Options and their Respective Functions
```
const promptStart = function () {
 inquirer.prompt(homeQuestions).then((response) => {
   if (response.homeOptions === "View All Employees") {
     allEmployees();
   } else if (response.homeOptions === "Add Employee") {
     addEmployee();
   } else if (response.homeOptions === "Update Employee Role") {
     updateEmployees();
   } else if (response.homeOptions === "View All Roles") {
     allRoles();
   } else if (response.homeOptions === "Add Role") {
     addRole();
   } else if (response.homeOptions === "View All Departments") {
     allDepartments();
   } else if (response.homeOptions === "Add Department") {
     addDepartments();
   }
 });
};
```
(Above:  If the user selects "View All Employees", from the Homepage list, thenthe allEmployees() function is called. If the user selects "Add Employee", the addEmployee() function is called. If the user selects "Update Employee Role", the updateEmployees() function is called. Similarly, if the user selects "View All Roles", "Add Role", "View All Departments", or "Add Department", the corresponding functions are called (allRoles(), addRole(), allDepartments(), and addDepartments() respectively). Those functions do the work. 


<p>&nbsp;</p>

### Function that Returns “All Employees” Table
```
function allEmployees() {
 db.query("SELECT * FROM employee", (error, response) => {
   if (error) throw error;
   console.table(response);
   promptStart();
 });
}
```
(Above: This code defines a function called allEmployees() which queries the database to retrieve information about all employees, and then logs the results in a table using the console.table() method. Once the table is displayed, the user is directed back to prompt start (the home page options). 


<p>&nbsp;</p>

### Manipulating Existing Tables Functionality
```
function addDepartments() {
 inquirer
   .prompt([
     {
       type: "input",
       message: "What is the name of the Department you want to add?",
       name: "depTitle",
     },
   ])
   .then((response) => {
     console.log(response);
     const id_query = `SELECT id FROM department ORDER BY id DESC LIMIT 1`;
     var newId;
     db.query(id_query, (err, res) => {
       if (err) {
         console.error(err);
         return;
       }
       const newId = res[0].id + 1;
       response.id = newId.toString();
       const insertDept = `INSERT INTO department (id, department_name) VALUES (${response.id}, "${response.depTitle}")`;
       db.query(insertDept, (err, res) => {
         if (err) {
           console.log(err);
           return;
         }
       });
       db.query("SELECT * FROM department", (error, response) => {
         if (error) throw error;
         console.table(response);
         promptStart();
       });
     });
   });
}
```
(Above: This code prompts the user to enter the name of a department they want to add to the database. Then, it generates a new ID for the department and inserts the department name and ID into the "department" table. After that, it retrieves all the department data from the table and displays it in a formatted table. Finally, it returns the user to the main prompt menu.)

<p>&nbsp;</p>


### Usage: 
By utilizing employee database software, companies can improve their clarity and visualization of data. Dynamic organizational charts provide a useful overview of the workforce, which reduces workload and minimizes the time spent on low-value and repetitive tasks. In addition to these benefits, Staff Spot Express Software, if developed further, could prove useful for computing HR metrics such as work anniversaries, service length, and other personal occasions. Proper maintenance of these records also contributes to greater data security, as the software builds a strong system that prevents the misuse of information. Lastly, the use of tools such as Staff Spot Express’ directories and organizational tables can effectively illustrate the relationships between employees. This, in turn, helps prevent duplicated work, enhances communication within teams, simplifies implementation, and reduces costs.

<p>&nbsp;</p>

## Credits
* Company Departments:https://lists.wordreference.com/show/company-departments.381/
* MySQL Setup: https://www.w3schools.com/sql/sql_select.asp
* MySQL Count: https://www.w3schools.com/sql/sql_count_avg_sum.asp
* Passing Parameters in Inquirer: https://stackoverflow.com/questions/58548293/how-to-pass-parameters-to-a-inquirer-question
* Console Table: https://www.npmjs.com/package/console.table?activeTab=readme
* NPM Package Figlet: https://www.npmjs.com/package/figlet
* MySQL2: https://www.npmjs.com/package/mysql2?activeTab=readme
* MySQl Getting Started: https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-getting-started.html
* MySQL Creating Database: https://dev.mysql.com/doc/refman/8.0/en/creating-database.html
* MySQL Tables: https://dev.mysql.com/doc/refman/8.0/en/creating-tables.html
* MySQl Select: https://dev.mysql.com/doc/refman/8.0/en/select.html
* MySQL Insert: https://dev.mysql.com/doc/refman/8.0/en/insert.html
* MySQL Update: https://dev.mysql.com/doc/refman/8.0/en/update.html
* MySQL Delete: https://dev.mysql.com/doc/refman/8.0/en/delete.html
* Schema Objects: https://docs.oracle.com/cd/B19306_01/server.102/b14220/schema.htm
* Loading Tables: https://dev.mysql.com/doc/refman/8.0/en/loading-tables.html
* MySQL Join: https://dev.mysql.com/doc/refman/8.0/en/join.html
* Markdown White Space: https://www.dotcms.com/docs/latest/markdown-syntax#:~:text=To%20add%20an%20extra%20line,spaces%20(e.g.%20).



<p>&nbsp;</p>

### License:
MIT License

Copyright (c) [2023] [Afi Nkhume-Crecy]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





