const fs = require('fs');
const inquirer = require('inquirer');


const homeQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?'
        name: 'homeOptions',
        choices: ['View All Employees', 'Add Employee','Update Employee Role','View All Roles', 'Add Role','View All Departments', 'Add Department'],
    }
    ]



