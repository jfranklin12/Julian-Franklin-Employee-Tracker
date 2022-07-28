SELECT department.id, department.department_name FROM department;

-- SELECT * FROM employee_role;

-- SELECT id AS value, title AS name FROM employee_role;

-- SELECT employee.manager_id FROM employee;

-- SELECT id AS value, CONCAT(first_name , ' ' , last_name) AS name FROM employee;

-- SELECT * FROM employee;


SELECT employee.id, employee.first_name AS First_Name, employee.last_name AS Last_Name, employee_role.title AS Title, department.department_name AS Department, employee_role.salary AS Salary, CONCAT(employee.first_name, ' ' ,employee.last_name) AS Manager
FROM employee
LEFT JOIN employee_role ON employee.role_id = employee_role.id
LEFT JOIN department ON employee_role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = employee.manager_id;
-- WHERE employee.manager_id = CONCAT(employee.first_name, ' ' ,employee.last_name);