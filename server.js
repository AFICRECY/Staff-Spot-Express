const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
// const { throwError } = require('rxjs');

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

var figlet = require("figlet");

figlet("Staff Spot Express", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});






const homeQuestions = [
  {
      type: 'list',
      message: 'What would you like to do?',
      name: 'homeOptions',
      choices: ['View All Employees', 'Add Employee','Update Employee Role','View All Roles', 'Add Role','View All Departments', 'Add Department'],
  }
  ]

  const promptStart = function () {
    inquirer.prompt(homeQuestions).then((response) => {
      if(response.homeOptions === "View All Employees"){
        allEmployees()
      } else if (response.homeOptions === "Add Employee"){
        addEmployee()
      }else if (response.homeOptions === "UpdateEmployee Role"){
        updateEmployees()
      }else if (response.homeOptions === "View All Roles"){
        allRoles()
      }else if (response.homeOptions === "Add Role"){
        addRole()
      }else if (response.homeOptions === "View All Departments"){
        allDepartments()
      }else if (response.homeOptions === "Add Department"){
        addDepartments()
    }
  })
  }


//   WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function allDepartments() {
  db.query("SELECT * FROM department", (error, response)=> {
    if (error) throw error
    console.table(response)
    promptStart()
  })
}

function allEmployees() {
  db.query("SELECT * FROM employee", (error, response)=> {
    if (error) throw error
    console.table(response)
    promptStart()
})
}

function allRoles() {
  db.query("SELECT * FROM role", (error, response)=> {
    if (error) throw error
    console.table(response)
    promptStart()
})
}


function addRole() {
    inquirer.prompt([
      {
      type: 'input',
      message: 'What is the name of the role you want to add?',
      name: 'roleTitle',
      },
      {
      type: 'input',
      message: 'What is the salary for that role?',
      name: 'roleSalary',
      },
      {
        type: 'list',
        message: 'Which department does this role belong to?',
        name: 'roleDept',
        choices: ['Sales', 'Human Resources','Engineering','Finance'],
      }
    ])
    .then((response,choices) => {
      console.log(response)
      const id_query=`SELECT id FROM role ORDER BY id DESC LIMIT 1`;
      var newId;
      db.query(id_query, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
      
        const newId = res[0].id + 1;      
        response.id = newId.toString();      
        // Here you can put the code that inserts the new record with the new ID.
        var choices = ['Sales', 'Human Resources','Engineering','Finance']
        const insertRole = `INSERT INTO role (id, title, salary, department_id) VALUES (${response.id}, "${response.roleTitle}", ${response.roleSalary}, ${choices.indexOf(response.roleDept)})`;
        db.query(insertRole,(err,res)=>{
          if(err){
            console.log(err)
          }
        })
        db.query("SELECT * FROM role", (error, response)=> {
          if (error) throw error
          console.table(response)
          promptStart()
        })
      });
      
    })
}

function addDepartments(){
  inquirer.prompt([
      {
      type: 'input',
      message: 'What is the name of the Department you want to add?',
      name: 'depTitle',
      }
    ])
    .then((response) => {
      console.log(response)
        const id_query=`SELECT id FROM department ORDER BY id DESC LIMIT 1`;
        var newId;
        db.query(id_query, (err, res) => {
          if (err) {
            console.error(err);
            return;
        }
        const newId = res[0].id + 1;  
        response.id = newId.toString();
        const insertDept = `INSERT INTO department (id, department_name) VALUES (${response.id}, "${response.depTitle}")`;
        db.query(insertDept,(err,res)=>{
          if(err){
            console.log(err);
            return;
          }
        })
        db.query("SELECT * FROM department", (error, response)=> {
          if (error) throw error
          console.table(response)
          promptStart()
        })
    
      })
    })
  }
  
  
  function addEmployee(){
    inquirer.prompt([
        {
          type: 'input',
          message: 'What is the first name of the employee you want to add?',
          name: 'firstName',
          },
          {
          type: 'input',
          message: 'What is the last name of the employee you want to add?',
          name: 'lastName',
          },
          {
          type: 'list',
          message: 'Who is this employees manager?',
          name: 'staffManager',
          choices: ['Naomi Johnson', 'Aktunde Ahmad','Tamika Johnson','Rashon Davis'],
          }
    ]) 
    .then((response,choices)=>{
      console.log(response)
      const id_query=`SELECT id FROM employee ORDER BY id DESC LIMIT 1`;
        var newId;
        db.query(id_query,(err, res)=>{
          if (err) {
            console.error(err);
            return;
          }
          const newId = res[0].id + 1;  
          response.id = newId.toString();
          var choices = ['Naomi Johnson', 'Aktunde Ahmad','Tamika Johnson','Rashon Davis'],
          // const insertDept = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${response.id}, "${response.firstName}", "${response.lastName}", "${response.staffManager}"," ", "${choices.indexOf(response.staffManager)}"`;})
        })
  })
  
}
  // addDepartments()
  // addEmployee()
  // updateEmployee()
  
  





// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// allRoles()
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// allEmployees()
// // WHEN I choose to add a department
// // THEN I am prompted to enter the name of the department and that department is added to the database
// addDepartments()
// // WHEN I choose to add a role
// // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// addRole()
// // WHEN I choose to add an employee
// // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// addEmployee()
// // WHEN I choose to update an employee role
// // THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// updateEmployee()







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

