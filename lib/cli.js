const inquirer = require('inquirer');
const fs = require('fs');

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
            {
                type: "input",
                message: "Please enter the name of the department you would like to add",
                name: "newDepartment"
            },
            {
                type: "input",
                message: "Please enter the title of the new role",
                name: "newRole"

            },

            {
                type: "input",
                message: "Add the salary of the new role",
                name: "salary"
            },

            {
                type: "input",
                message: "Add the department the new role will be assigned to",
                name: "salary"
            },

        ])
        .then((response) =>
            responseHandler(response)

        )
        .then(() => console.log('SVG Logo Created!!'))
        .catch(err => console.log(`Error: ${err}`));
}


module.exports = run;