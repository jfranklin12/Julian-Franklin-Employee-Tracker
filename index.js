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



const action = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
  }
]







function begin() {
  inquirer
    .prompt(action).then(choice => {

      switch (choice.options) {
        case 'View All Departments':
          viewAllDeparments();
          begin();
        case 'View All Roles':
          viewAllRoles();
          begin();
        case 'View All Employees':
          viewAllEmployees();
          begin();
          case 'Add Employee':
            

      }




    });

};


const viewAllDeparments = () => {
  db.query('SELECT deparment.id, deparment.deparment_name FROM deparment', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.table(results)
    }
  })
}

const viewAllRoles = () => {
  db.query('SELECT * FROM employee_role', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.table(results)
    }
  })
}

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.table(results)
    }
  })
}

const addEmployee = () => {
  db.query('', (err, results) => { 

  
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
      choice: results,
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
    })
  })
  })

}

begin();