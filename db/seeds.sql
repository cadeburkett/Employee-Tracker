USE employees_db;

INSERT INTO department 
    (name)
VALUES 
    ("Sales"), 
    ("Engineering"), 
    ("Legal"), 
    ("Finance");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 4),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 190000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Miley", "Cyrus", 6, null),
    ("Arianna", "Grande", 5, null),
    ("Demi", "Lovato", 3, null),
    ("Lady", "Gaga", 1, 2),
    ("Nick", "Jonas", 7, 1),
    ("Justin", "Bieber", 2, 4),
    ("Selena", "Gomez", 4, 3),
    ("Taylor", "Swift", 4, 3),
    ("Harry", "Styles", 2, 4);