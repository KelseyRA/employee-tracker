// All imported dependencies

const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lunaLuna!",
    database: "personnel_db"
});


// Functions return promises to use in query functions

function showDept() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM departments;",
            function (err, res) {
                if (err) reject(err);
                resolve(res);
            })
    })
}

function showRoles() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM roles;",
            function (err, res) {
                if (err) reject(err);
                resolve(res);
            })
    })
};

function showEmployees() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM employees;",
            function (err, res) {
                if (err) reject(err);
                resolve(res);
            })
    })
};

// Functions to view each individual table.

function viewAllDepartments() {
    db.query('SELECT * FROM departments;', (err, result) => {
        console.table(result);
        run();
    })
};

function viewAllRoles() {
    db.query('SELECT * FROM roles ;', (err, result) => {
        console.table(result);
        run();
    })
};

function viewAllEmployees() {
    db.query('SELECT * FROM employees ;', (err, result) => {
        console.table(result);
        run();
    })
};

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
                    "Update an employee's role",
                    "Exit",
                ],
                name: "options"
            },

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

                case "Update an employee's role":
                    updateRole()
                    break;

                case "Exit":
                    db.end()
                    break;
            }
        }
        )
        .then(() => console.log(''))
        .catch(err => console.log(`Error: ${err}`));
};

// Add a department

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the name of the department you would like to add",
                name: "newDepartment"

            }
        ])
        .then(response => {
            db.query(
                "INSERT INTO departments SET?",
                {
                    department_name: response.newDepartment
                },
                (err => {
                    if (err) throw err;
                    console.log('\n');
                    console.log('The new department has successfully been added.')
                    console.log('\n');
                    run();
                })
            )
        })
};

// Add a role

function addRole() {
    showDept().then(departments => {
        const deptChoices = departments.map(({ name: department_name, id: value }) => ({ department_name, value }));

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Please enter the title of the new role",
                    name: "newRole"
                },
                {
                    type: "input",
                    message: "Please enter the salary for this new role",
                    name: "newSalary"
                },
                {
                    name: "newRoleDept",
                    type: "list",
                    message: "Please enter the department this role will be in",
                    choices: deptChoices
                },
            ])
            .then(response => {
                db.query(
                    "INSERT INTO roles SET?",
                    {
                        title: response.newRole,
                        salary: response.newSalary,
                        department_id: response.deptChoices
                    },
                    (err => {
                        if (err) throw err;
                        console.log('\n');
                        console.log('The new role was added successfully.')
                        console.log('\n');
                        run();
                    })
                )
            })
    })
};

// Add an employee

function addEmployee() {
    showRoles().then(roles => {
        const roleChoices = roles.map(({ title: name, id: value }) => ({ name, value }));
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Please enter the employee's first name",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "Please enter the employee's last name",
                    name: "lastName"
                },
                {
                    name: "newEmployeeRole",
                    type: "list",
                    message: "Please enter the employee's role",
                    choices: roleChoices
                },
                {
                    type: "input",
                    message: "Please enter the employee's manager",
                    name: "managerId"
                },
            ])
            .then(response => {
                db.query(
                    "INSERT INTO employees SET",
                    {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: response.newEmployeeRole,
                        manager_id: response.managerId
                    },
                    (err => {
                        if (err) throw err;
                        console.log('\n');
                        console.log('A new employee has been added successfully.')
                        console.log('\n');
                        run();
                    })
                )

            })

    })
};

// Update an employee's role

async function updateRole() {
    try {

        const roles = await showRoles();
        const employee = await showEmployees();

        const allRoles = roles.map(({ title: name, id: value }) => ({ name, value }));
        const allEmployees = employee.map(({ first_name: name, id: value }) => ({ name, value }));

        inquirer
            .prompt([
                {
                    name: "employeeNames",
                    type: "list",
                    message: "Please chose the employee that you would like to change their role",
                    choices: allEmployees
                },
                {
                    name: "employeeRoles",
                    type: "list",
                    message: "Please chose the new role",
                    choices: allRoles
                }
            ])
            .then(response => {
                db.query("UPDATE employees SET role_id = ? WHERE role_id = ?;", [response.employeeNames, response.newEmployeeRoles],
                    async function (err, res) {
                        if (err) throw err;
                        try {
                            console.log("\n");
                            console.log("Employee successfully reassigned new role!");
                            console.log("\n");
                            await run();
                        }
                        catch (err) {
                            console.log(err);
                        }
                    })
            })
    }
    catch (err) {
        console.log(err);
    }
}

// Calls the index.js to start running the application

module.exports = run;