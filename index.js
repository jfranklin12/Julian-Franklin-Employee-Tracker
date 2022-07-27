const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company_db'
  },
  console.log(`Connected to the compary_db database.`),
);
// prompt question to begin program
const action = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
  }
]
// function to begin program
function begin() {
  inquirer
    .prompt(action).then(choice => {
      // switch to change case based on user input
      switch (choice.options) {
        case 'View All Departments':
          viewAllDeparments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Deparment':
          break;
        case 'Add Role':
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Quit':
          break;

      };
    });
};

// query to 'View All Deparments' 
const viewAllDeparments = () => {
  db.query('SELECT * FROM deparment', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
    begin();
  });
};
// query to 'View All Roles' 
const viewAllRoles = () => {
  db.query('SELECT * FROM employee_role', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
    begin();
  });
};
// query to 'View All Employees' 
const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
    begin();
  });
};
// function to add employee with queries
const addEmployee = () => {
  const roles = [];
  db.query('SELECT id AS value, title AS name FROM employee_role;', (err, role) => {
    console.log(role)
    console.log(role[0].name)

    for (let i = 0; i < role.length; i++) {
      roles.push(role[i].name);
      console.log(roles)
    }
    const createEmployee = [
      {
        type: 'input',
        name: 'firstName',
        message: 'What is their first name?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is their last name?',
      },
      {
        type: 'list',
        name: 'title',
        message: 'What is their job title?',
        choice: roles,
      },

    ]

    inquirer
      .prompt(createEmployee).then(emp => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [emp.firstName, emp.lastName, emp.title, NULL], (err, results) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Successfully added employee!');
            console.table(results)
          }
          begin();
        });
      });
  });

}

begin();