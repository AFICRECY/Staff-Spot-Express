const fs = require('fs');
const inquirer = require('inquirer');




const addDeptQuestions = [
        {
        type: 'input',
        message: 'What is the name of the Department you want to add?',
        name: 'depTitle',
        }
        ]


const addRoleQuestions = [
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
        choices: ['Xxx', 'XXX','XXX','XXX'],
        }
]


const addEmployeeQuestions = [
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
        choices: ['Xxx', 'XXX','XXX','XXX'],
        }
]


const updateEmployeeRole = [
    {
        type: 'list',
        message: 'Which employees role do you want to update?',
        name: 'updateRole',
        choices: ['Xxx', 'XXX','XXX','XXX'],
        },
        {
        type: 'list',
        message: 'Which role do you want to assign to the selected employee?',
        name: 'updateEmployeeRole',
        choices: ['Xxx', 'XXX','XXX','XXX'],
        }
]