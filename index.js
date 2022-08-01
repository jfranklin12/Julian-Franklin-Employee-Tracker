const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company_db',
  },
  console.log(`Connected to the compary_db database.`)
);
// prompt question to begin program
const action = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Quit',
    ],
  },
];
// function to begin program
function begin() {
  inquirer.prompt(action).then((choice) => {
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
        addDepartment();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Quit':
        quit();
        break;
    }
  });
}

// query to 'View All Deparments'
const viewAllDepartments = () => {
  db.query(
    'SELECT department.id, department.department_name FROM department;',
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log('');
        console.table('Departments', results);
      }
      begin();
    }
  );
};
// query to 'View All Roles'
const viewAllRoles = () => {
  db.query('SELECT * FROM employee_role', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('');
      console.table('Roles', results);
    }
    begin();
  });
};
// query to 'View All Employees'
const viewAllEmployees = () => {
  db.query(
    'SELECT employee.id, employee.first_name AS First_Name, employee.last_name AS Last_Name, employee_role.title AS Title, department.department_name AS Department, employee_role.salary AS Salary, employee.manager_id AS Manager FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id',
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log('');
        console.table('Employees', results);
      }
      begin();
    }
  );
};
// function to add employee with queries
const addEmployee = () => {
  db.query(
    'SELECT id AS value, title AS name FROM employee_role;',
    (err, role) => {
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
            { name: 'Julian Franklin', value: 7 },
            { name: 'Charli Dunlap', value: 5 },
            { name: 'Hunter Padgett', value: 3 },
            { name: 'Vince Yang', value: 1 },
          ],
        },
      ];

      inquirer.prompt(createEmployee).then((emp) => {
        // console.log(emp)
        db.query(
          'INSERT INTO employee SET ?',
          {
            first_name: emp.firstName,
            last_name: emp.lastName,
            role_id: emp.title,
            manager_id: emp.manager,
          },
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Successfully added employee!');
              // console.table(viewAllEmployees())
            }
            begin();
          }
        );
      });
    }
  );
};
// Function to add depatment
const addDepartment = () => {
  const createDepartment = [
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department?',
    },
  ];

  inquirer.prompt(createDepartment).then((depName) => {
    // console.log(depName);
    db.query(
      'INSERT INTO department SET ?',
      {
        department_name: depName.departmentName,
      },
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `Successfully added ${depName.departmentName} department!`
          );
          // console.table(viewAllDepartments())
        }
        begin();
      }
    );
  });
};
// Function to add role
const addRole = () => {
  db.query(
    'SELECT id AS value, department_name AS name FROM department;',
    (err, dep) => {
      console.log(dep)
      const createRole = [
        {
          type: 'input',
          name: 'roleName',
          message: 'What is the name of the role?',
        },
        {
          type: 'number',
          name: 'roleSalary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'roleDep',
          message: 'Which department does the role belong to?',
          choices: dep
        },
      ];

      inquirer.prompt(createRole).then((empRole) => {
        console.log(empRole);
        db.query(
          'INSERT INTO employee_role SET ?',
          {
            title: empRole.roleName,
            salary: empRole.roleSalary,
            department_id: empRole.roleDep,
          },
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Successfully added ${empRole.roleName} to the database!`);
            }
            begin();
          }
        );
      });
    }
  );
};

const quit = () => {
  const exit = [
    {
      type: 'confirm',
      name: 'exitProgram',
      message: 'Do you want to quit?',
      default: 'Y'
    }
  ]
  inquirer.prompt(exit).then((err, results) => {
    console.log('Bye!');
    process.exit(1);
    
});
}
begin();
