const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: ''
  },
  console.log(`Connected to the compary_db database.`)
);

const action = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles','View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
  }
]

function begin() {
  inquirer
      .prompt(action).then(choices => {

        switch(options.choices){
          case 'View All Departments':
            

        };  
      });

};

begin();