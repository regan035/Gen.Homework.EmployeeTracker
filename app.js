const mysql = require ('mysql2');
const inquirer = require('inquirer');
//const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'rootroot',
    database:'employeeDB'
});
// const connection = mysql.createConnection({
//   host:'localhost',
//   port:8889,
//   user:'root',
//   password:'root',
//   database:'employeeDB'
// });

connection.connect(function(err){
    if (err) throw err;
    console.log ('connected as id' + connection.threadId + '\n');
    run(connection);
});

function run (connection){
    inquirer
      .prompt({
        type: "list",
        name: "selection",
        message: "What task would you like to perform?",
        choices: ["View Department", "View Employee", "View Role", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
      })
      .then(function(answer) {
        console.log(answer)
          switch (answer.selection) {
            case "View Department":
              connection.query("SELECT * FROM departments", (err, data) => {
                console.table(data);
                run(connection);
              });
              break;
            case "View Employee":
              connection.query("SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id", (err, data) => {
                console.table(data);
                run(connection);
              });
              break;
            case "View Role":
              //roles.id, roles.title, roles.salary, departments.department_name
              connection.query("SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id", (err, data) => {
                console.table(data);
                run(connection);
              });
              break;
            case "Add Department":
              addDepartment();
              break;
            case "Add Role":
              addRole();
              break;
            case "Add Employee":
              addEmployee();
              break;
            case "Update Employee Role":
              updateEmployeeRole();
              break;
          }
      });
}

function addDepartment(){
  inquirer
      .prompt({
        type: "input",
        name: "department_name",
        message: "Please type in the department name"
      })
      .then(function(answer){
        connection.query("INSERT INTO departments SET ?",
        {
          department_name: answer.department_name
        },
        (err, data) => {
          console.table(data);
          run(connection);
        });
      })
}

function addRole(){
  connection.query("SELECT * FROM departments", (err, data) => {
    console.table(data);
    
    inquirer
    .prompt([
      {
        type: "input",
          name: "title",
          message: "Please type in the title"
        },
        {
          type: "number",
          name: "salary",
          message: "Please type in the salary"
        },
        {
          type: "input",
          name: "department_id",
          message: "Please type in the department_id"
        },
      ])
      .then(function(answer){
        // console.log(answer);
        // console.log({
          //   title: answer.title,
        //   salary: answer.salary,
        //   department_id: answer.department_id
        // })
        connection.query("INSERT INTO roles SET ?",
        answer,
        (err, data) => {
          //console.table(data);
          run(connection);
        });
      })
    });
}
    
function addEmployee(){
  inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Please type in the first name"
        },
        {
          type: "input",
          name: "last_name",
          message: "Please type in the last name"
        },
        {
          type: "number",
          name: "role_id",
          message: "Please type in the role id"
        },
        {
          type: "input",
          name: "manager_id",
          message: "Please type in the manager id"
        },
      ])
      .then(function(answer){
        connection.query("INSERT INTO employees SET ?",
        answer,
        (err, data) => {
          console.table(data);
          run(connection);
        });
      })
}

function updateEmployeeRole(){
  connection.query("SELECT * FROM employees", (err, data) => {
    console.table(data);
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "Which employee do you want to change?"
        },
        {
          type: "number",
          name: "role_id",
          message: "type in the new role id"
        }
      ]).then(function(answers){
        connection.query("UPDATE employees SET ? WHERE id = " + answers.id,
        {
          role_id: answers.role_id
        },
        (err, data) => {
          console.table(data);
          run(connection);
        });
      })
  });
}