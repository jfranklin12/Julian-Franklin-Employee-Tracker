const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require ('console.table');

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
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Department':
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
const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table('Departments', results);
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
      console.table('Roles', results);
    }
    begin();
  });
};
// query to 'View All Employees' 
// Need to add join for department and employee role
const viewAllEmployees = () => {
  db.query('SELECT employee.id, employee.first_name AS First_Name, employee.last_name AS Last_Name, employee_role.title AS Title, department.department_name AS Department, employee_role.salary AS Salary, employee.manager_id AS Manager FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table('Employees', results);
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
        choices: role, {Name: 'None', value: 'NULL'}
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is their manager?',
        choices: [
          { name: 'Julian Franklin', value: 7 },
          { name: 'Charli Dunlap', value: 5 },
          { name: 'Hunter Padgett', value: 3 },
          { name: 'Vince Yang', value: 1 }
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
          }, (err, results) => {
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
// const addDepartment = () => {
//   db.query('SELECT id AS value, title AS name FROM employee_role;', (err, role) => {
//     console.log(role)

//     const createEmployee = [
//       {
//         type: 'input',
//         name: 'firstName',
//         message: 'What is their first name?',
//       },
//       {
//         type: 'input',
//         name: 'lastName',
//         message: 'What is their last name?',
//       },
//       {
//         type: 'list',
//         name: 'title',
//         message: 'What is their job title?',
//         choices: role,
//       },
//       {
//         type: 'list',
//         name: 'manager',
//         message: 'Who is their manager?',
//         choices: [
//           { name: 'Julian Franklin', value: 7 },
//           { name: 'Charli Dunlap', value: 5 },
//           { name: 'Hunter Padgett', value: 3 },
//           { name: 'Vince Yang', value: 1 }
//         ]
//       }
//     ]

//     inquirer
//       .prompt(createEmployee).then(emp => {
//         console.log(emp)
//         db.query
//           ('INSERT INTO employee SET ?', {
//             first_name: emp.firstName,
//             last_name: emp.lastName,
//             role_id: emp.title,
//             manager_id: emp.manager
//           }, (err, results) => {
//             if (err) {
//               console.log(err)
//             } else {
//               console.log('Successfully added employee!');
//               console.table(viewAllEmployees())
//             }
//             begin();
//           });
//       });
//   });
// };



begin();