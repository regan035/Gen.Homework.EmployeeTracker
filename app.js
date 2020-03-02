const mysql = require ('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host:'localhost',
    port:3000,
    user:'root',
    password:'rootroot',
    database:'employeeDB'
});

connection.connect(function(err){
    if (err) throw err;
    console.log ('connected as id' + connection.threadId + '\n');
    run();
});

function run (connection){
    inquirer
      .prompt({
        type: "list",
        name: "selection",
        message: "What task would you like to perform?",
        choices: ["Department", "Employee", "Role"]
      })
      .then(function(answer) {
          switch (answer.consoleTable) {
            case "Departement":
              connection.query("SELECT * FROM department", (err, data) => {
                console.table(data);
                run(connection);
              });
              break;
            case "Employee":
              connection.query("SELECT * FROM employee", (err, data) => {
                console.table(data);
                run(connection);
              });
              break;
            case "Role":
              connection.query("SELECT * FROM role", (err, data) => {
                console.table(data);
                run(connection);
              });
              break;
          }
      });
}