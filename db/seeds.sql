INSERT INTO deparment (deparment_name)
VALUES (Engineering),
       (Finance),
       (Legal),
       (Sales);

INSERT INTO employee_role (title, salary, deparment_id)
VALUES ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 150000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Vince", "Yang", 1, NULL),
       ("Ashley", "Thompson", 2, 1),
       ("Hunter", "Padgett", 3, NULL),
       ("Mary Margaret", "Taylor", 4, 3),
       ("Charli", "Dunlap" 5, NULL),
       ("Teagrin", "Forde" 6, 5),
       ("Paulo", "Sergio" 7, NULL),
       ("William", "Summerlin" 8, 7);