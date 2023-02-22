const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "lunaLuna!",
    database: "personnel_db"
});

// Inquirer prompts which are served to the user once the start the application.

function run() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                ],
                name: "options"
            },
            // {
            //     type: "input",
            //     message: "Please enter the name of the department you would like to add",
            //     name: "newDepartment"
            // },
            // {
            //     type: "input",
            //     message: "Please enter the title of the new role",
            //     name: "newRole"

            // },

            // {
            //     type: "input",
            //     message: "Add the salary of the new role",
            //     name: "salary"
            // },

            // {
            //     type: "input",
            //     message: "Add the department the new role will be assigned to",
            //     name: "salary"
            // },

        ])
        .then((response) => {
            switch (response.options) {
                case "View all departments":
                    viewAllDepartments()
                    break;

                case "View all roles":
                    viewAllRoles()
                    break;

                case "View all employees":
                    viewAllEmployees()
                    break;

                case "Add a department":
                    addDepartment()
                    break;

                case "Add a role":
                    addRole()
                    break;

                case "Add an employee":
                    addEmployee()
                    break;

                case "Update employee role":
                    updateRole()
                    break;
            }
        }
        )
        .then(() => console.log(''))
        .catch(err => console.log(`Error: ${err}`));
}

function viewAllDepartments() {
    db.query('SELECT * FROM departments;', (err, result) => {
        console.table(result);
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM roles ;', (err, result) => {
        console.table(result);
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employees ;', (err, result) => {
        console.table(result);
    })
}


module.exports = run;