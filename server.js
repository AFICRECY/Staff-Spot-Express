const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const { throwError } = require('rxjs');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
db.connect((error) => {
  if (error) throw error

  promptStart()
}) 

const homeQuestions = [
  {
      type: 'list',
      message: 'What would you like to do?',
      name: 'homeOptions',
      choices: ['View All Employees', 'Add Employee','Update Employee Role','View All Roles', 'Add Role','View All Departments', 'Add Department'],
  }
  ]

  const promptStart = function () {
    inquirer.prompt(questions).then((response) => {
      if(response.homeOptions === "View All Employees"){
        allEmployees()
      } else if (response.homeOptions === "Add Employee"){
        addemployee()
      }else if (response.homeOptions === "UpdateEmployee Role"){
        updateEmployees()
      }else if (response.homeOptions === "View All Roles"){
        allRoles()
      }else if (response.homeOptions === "Add Role"){
        addRole()
      }else if (response.homeOptions === "View All Departments"){
        allDepartments()
      }else if (response.homeOptions === "Add Departments"){
        addDepartments()
    }
  })
  }



  
//   WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
allDepartments()
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
allRoles()
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
allEmployees()
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 




// SELECT * FROM departments;


// SELECT *
// FROM roles,
// INNER JOIN title ON department.roles = title.id;


// SELECT
//     firstName AS first_name, lastName.last_name, title.last_name AS last_name, title.Position, department.Position AS Position, department.department, salary.department AS department, salary.salary, salary.manager AS manager
// FROM allDepartments
// JOIN allRoles ON allDepartments. = allRoles.id;

// Update review name
// PUT 
// http://localhost:3001/api/review/1
// {
// "movie": "Lion King",
// "review": "Amazing!!!!"
// }
// app.put('/api/review/:id', (req, res) => {

//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {


//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
