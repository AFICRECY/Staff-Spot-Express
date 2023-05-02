const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
// const { throwError } = require('rxjs');

// Creating Connection to MySQL
// This code creates a connection to a MySQL database named "employee_db". It uses the "mysql" package to create a connection object called "db" with the following properties:
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

db.connect((error) => {
  if (error) throw error;

  promptStart();
});


// Figlet
// Calling the figlet object as a function is shorthand for calling the text function. This method allows you to create ASCII Art from text
var figlet = require("figlet");

figlet("Staff Spot Express", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});


// Initial Prompt/Landing Prompts
// These are the prompts that the user will initally see in a drop down list style. 
// The below function is run when the user chooses an option and that directs the user to the other functions which do the work.
const homeQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "homeOptions",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

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

// WHEN I choose to VIEW ALL DEPARTMENTS
// THEN I am presented with a formatted table showing department names and department ids
function allDepartments() {
  db.query("SELECT * FROM department", (error, response) => {
    if (error) throw error;
    console.table(response);
    promptStart();
  });
}


// WHEN I choose to VIEW ALL EMPLOYEES
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function allEmployees() {
  db.query("SELECT * FROM employee", (error, response) => {
    if (error) throw error;
    console.table(response);
    promptStart();
  });
}


// WHEN I choose to VIEW ALL ROLES
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function allRoles() {
  db.query("SELECT * FROM role", (error, response) => {
    if (error) throw error;
    console.table(response);
    promptStart();
  });
}


// WHEN I choose to ADD A ROLE
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role you want to add?",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "What is the salary for that role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "Which department does this role belong to?",
        name: "roleDept",
        choices: ["Sales", "Human Resources", "Engineering", "Finance"],
      },
    ])
    .then((response, choices) => {
      console.log(response);
      const id_query = `SELECT id FROM role ORDER BY id DESC LIMIT 1`;
      var newId;
      db.query(id_query, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        const newId = res[0].id + 1;
        response.id = newId.toString();
        var choices = ["Sales", "Human Resources", "Engineering", "Finance"];
        const insertRole = `INSERT INTO role (id, title, salary, department_id) VALUES (${
          response.id
        }, "${response.roleTitle}", ${response.roleSalary}, ${choices.indexOf(
          response.roleDept
        )})`;
        db.query(insertRole, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
        db.query("SELECT * FROM role", (error, response) => {
          if (error) throw error;
          console.table(response);
          promptStart();
        });
      });
    });
}



// WHEN I choose to ADD A DEPARTMENT
// THEN I am prompted to enter the name of the department and that department is added to the database
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



// WHEN I choose to ADD AN EMPLOYEE
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee you want to add?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee you want to add?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is this employee's role?",
        name: "staffRole",
        choices: ['Manager', 'Sales Representative', 'Marketing Manager', 'Marketing Specialist', 'Software Engineer', 'Associate Engineer', 'Associate Engineer', 'Product Designer'],
      },
      {
        type: "list",
        message: "Who is this employee's manager?",
        name: "staffManager",
        choices: [
          "Naomi Johnson",
          "Aktunde Ahmad",
          "Tamika Johnson",
          "Rashon Davis",
        ],
      },
    ])
    .then((response, choices) => {
      console.log(response);
      const id_query = `SELECT id FROM employee ORDER BY id DESC LIMIT 1`;
      var newId;
      db.query(id_query, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        const newId = res[0].id + 1;
        response.id = newId.toString();
        var choices = [
          "Naomi Johnson",
          "Aktunde Ahmad",
          "Tamika Johnson",
          "Rashon Davis",
        ];
        var employeeRole= ['Manager', 'Sales Representative', 'Marketing Manager', 'Marketing Specialist', 'Software Engineer', 'Associate Engineer', 'Associate Engineer', 'Product Designer']
        const insertEmp = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${response.id}, "${response.firstName}", "${response.lastName}", "${employeeRole.indexOf(response.staffRole)}", "${choices.indexOf(response.staffManager)}")`;

        db.query(insertEmp, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(res);
        });

        db.query("SELECT * FROM employee", (error, response) => {
          if (error) throw error;
          console.table(response);
          promptStart();
        });
      });
    });
}



// WHEN I choose to UPDATE AN EMPLOYEE ROLE
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployees(){
  
  inquirer
    .prompt([
    {
        message: 'Which employee role do you want to update?',
        name: 'updateRole',
        }
    ])
    db.query("SELECT * FROM employee", (error, response) => {
      if (error) throw error;
      console.table(response);
      
    });
    console.log("\n")
    inquirer.prompt([
      {
        message: 'Type employee id.',
        name:'staffId'
      }
    ])
    .then((response) => {
      
      var staffId=response.staffId;
      const updateEmployee = `SELECT * FROM employee WHERE id = ${response.staffId}`;

      db.query(updateEmployee,(error, response) => {
        if (error) throw error;
        console.table(response);
      });
      console.log(response)
      inquirer.prompt([
        {
          type:"list",
          message:'Which role do you want to assign to the selected employee?',
          name:'staffRole',
          choices: ['Manager', 'Sales Representative', 'Marketing Manager', 'Marketing Specialist', 'Software Engineer', 'Associate Engineer', 'Associate Engineer', 'Product Designer'],
        }
      ])
      .then((response)=>{
        var choices= ['Manager', 'Sales Representative', 'Marketing Manager', 'Marketing Specialist', 'Software Engineer', 'Associate Engineer', 'Associate Engineer', 'Product Designer'];
        const updateStaffRole=`UPDATE employee SET role_id = '${choices.indexOf(response.staffRole)}' WHERE id = ${staffId}`;
        db.query(updateStaffRole,(error, response) => {
          if (error) throw error;
          console.table(response);
        });
        db.query("SELECT * FROM employee", (error, response) => {
          if (error) throw error;
          console.table(response);
          promptStart();
        });
      })
    })
}
