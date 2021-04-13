const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_db"
});

connection.query = util.promisify(connection.query)

connection.connect((err) => {
    if (err) throw err;
    init();
})

const init = () => {
    inquirer.prompt(
    [
        {
            type: "list",
            message: "Select a task:",
            name: "taskList",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee role",
                "Exit",
            ]
        }
    ]
)
.then((response) => {
    switch (response.taskList) {
        case "Add department":
            addDep();
            break;

        case "Add role":
            addRole();
            break;

        case "Add employee":
            addEmp();
            break;

        case "View departments":
            viewDep();
            break;

        case "View roles":
            viewRole();
            break;
        
        case "View employees":
            viewEmp();
            break;

        case "Update employee role":
            updateEmpRole();
            break;

        default:
            console.log("Goodbye")
            connection.end();
            process.exit(0);
    }
})}


const addDep = () => {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the deparment's name?",
                name: "depName"
            }
        ]
    ).then((response) => {
        let query = connection.query(
            "INSERT INTO department SET ? ",
            {
                name: response.depName
            },
            (err) => {
                if (err) throw err;
                console.log("Department added!");
                init();
            }
        )
    })
}

const addRole = () => {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "roleSal"
            },
            // {
            //     type: "input",
            //     message: "What is the role's department?",
            //     name: "roleDep",
            // },
        ]
    ).then((response) => {
        let query = connection.query(
            "INSERT INTO roll SET ? ",
            {
                name: response.roleName,
                salary: response.roleSal,


            },
            (err) => {
                if (err) throw err;
                console.log("Role added!");
                init();
            }
        )
    })
}

const addEmp = () => {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "roleSal"
            },
            // {
            //     type: "input",
            //     message: "What is the role's department?",
            //     name: "roleDep",
            // },
        ]
    ).then((response) => {
        let query = connection.query(
            "INSERT INTO roll SET ? ",
            {
                name: response.roleName,
                salary: response.roleSal,
                // department_id: response.roleDep
            },
            (err) => {
                if (err) throw err;
                console.log("Employee added!");
                init();
            }
        )
    })
}

const viewDep = () => {
    const query = 
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      init()
    })
}

const viewRole = () => {
    const query = 
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;"
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      init()
    })
}

const viewEmp = () => {
    const query = 
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' , e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;"
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res)
      init()
    })
}

const updateEmpRole = () => {
    const query = 
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;"
    connection.query((err, results) => {
        if (err) throw err;
    inquirer
        .prompt(
            [
                {
                    type: "list",
                    message: "Which employee's role are you updating?",
                    name: "employeeName",
                    choices: function() {
                        const employeesArray = [];
                        results.forEach(({ last_name }) => {
                            employeesArray.push(last_name);
                        });
                        return employeesArray;
                    }
                },
                {
                    type: "input",
                    message: "What is employee's new role?",
                    name: "empNewRole",
                },
            ]
        )
        .then((response) => {
            connection.query(
                "UPDATE employee WHERE ?",
                [{
                    role_id: response.empNewRole,
                }],
                (err) => {
                    if (err) throw err;
                    console.log("Employee role updated!");
                    init();
                }
            )
        })
    })
}
