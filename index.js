const mysql = require('mysql2');
const inquirer = require('inquirer');

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
  db.query('SELECT id AS value, title AS name FROM employee_role;', (err, role) => {
    console.log(role)
  
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
        choices: role,
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is their manager?',
        choices: [
          {name: 'Julian Franklin', value: 7},
          {name: 'Charli Dunlap', value: 5},
          {name: 'Hunter Padgett', value: 3},
          {name: 'Vince Yang', value: 1}
        ]
      }
    ]
    
 
    inquirer
      .prompt(createEmployee).then(emp => {
        console.log(emp)
        db.query
        ('INSERT INTO employee SET ?', {
          first_name: emp.firstName,
          last_name: emp.lastName,
          role_id: emp.title,
          manager_id: emp.manager
        },(err, results) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Successfully added employee!');
            console.table(viewAllEmployees())
          }
          begin();
        });
      });     
    });
  };
 



begin();