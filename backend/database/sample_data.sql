/* Drop all tables */
create database jeera;
use jeera;

DROP TABLE IF EXISTS linkedissues, issues_teams, issues, tasks_teams, projects_teams, tasks, projects, labels, issuetypes, team_members, teams, users;

/* Create the Users table */
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
);

/* Create the Teams table */
CREATE TABLE teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

/* Create the Team_Members junction table */
CREATE TABLE team_members (
    team_id INT,
    user_id INT,
    PRIMARY KEY (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* Create the IssueTypes table */
CREATE TABLE issuetypes (
    issue_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('Epic', 'Task', 'Story', 'Bug') NOT NULL
);





/* Create the Labels table */
CREATE TABLE labels (
    label_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

/* Create the Projects table */
CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    maintainer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maintainer_id) REFERENCES users(user_id)
);

/* Create the Tasks table */
CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('to do', 'done', 'in progress') DEFAULT 'to do',
    priority VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE issues (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    issue_type_id INT,
    task_id INT,
    summary VARCHAR(255) NOT NULL,
    attachments TEXT,
    description TEXT,
    reports_to INT,
    assignee_id INT,
    priority VARCHAR(50),
    label VARCHAR(255),
    status ENUM('in progress', 'open', 'closed', 'resolved') DEFAULT 'open',
    FOREIGN KEY (issue_type_id) REFERENCES issuetypes(issue_type_id),
    FOREIGN KEY (assignee_id) REFERENCES users(user_id),
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

/* Create the LinkedIssues junction table */
CREATE TABLE linkedissues (
    issue_id INT,
    linked_issue_id INT,
    PRIMARY KEY (issue_id, linked_issue_id),
    FOREIGN KEY (issue_id) REFERENCES issues(issue_id),
    FOREIGN KEY (linked_issue_id) REFERENCES issues(issue_id)
);
/* Create the Tasks_Teams junction table */
CREATE TABLE tasks_teams (
    task_id INT,
    team_id INT,
    PRIMARY KEY (task_id, team_id),
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

/* Create the Projects_Teams junction table */
CREATE TABLE projects_teams (
    project_id INT,
    teamname varchar(255),
    PRIMARY KEY (project_id, teamname),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

/* Create the Issues_Teams junction table */
CREATE TABLE issues_teams (
    issue_id INT,
    team_id INT,
    PRIMARY KEY (issue_id, team_id),
    FOREIGN KEY (issue_id) REFERENCES issues(issue_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

/* Create the Users table */
INSERT INTO users (username, full_name, email_id, password, isAdmin) VALUES ('john_doe', 'John Doe', 'john@example.com', '$2y$10$0XmiYd3prPpQg7Lxg4z0EeGVGWri5Ti9HG2ea1inTWVUYPyt54IAm', TRUE), ('jane_doe', 'Jane Doe', 'jane@example.com', '$2y$10$UN0Ioea/DgPOVwkwzkRX8OS1CTcWVl42wdwaOMoZdgNBF0ZBXF6Au', FALSE), ('admin_user', 'Admin User', 'admin@example.com', '$2y$10$BViu/8HcyoZ82FlYMcEMKud8QIc0S7l6Nf79VQwPREDWGB8exgPai', TRUE);

/* Create the Teams table */
INSERT INTO teams (name, description) VALUES ('Development', 'Handles development tasks.'), ('Testing', 'Handles testing tasks.'), ('Design', 'Handles design tasks.');

/* Create the Team_Members junction table */
INSERT INTO team_members (team_id, user_id) VALUES (1, 1), (1, 2), (2, 2), (3, 3);

/* Create the IssueTypes table */
INSERT INTO issuetypes (name) VALUES ('Epic'), ('Task'), ('Story'), ('Bug');

/* Create the Labels table */
INSERT INTO labels (name) VALUES ('Bug'), ('Feature'), ('Enhancement');

/* Create the Projects table */
INSERT INTO projects (name, description, maintainer_id) VALUES ('Project A', 'Description for Project A', 1), ('Project B', 'Description for Project B', 2);

/* Create the Tasks table */
INSERT INTO tasks (project_id, name, description, status, priority) VALUES (1, 'Task 1 for Project A', 'Description for Task 1 in Project A', 'to do', 'High'), (1, 'Task 2 for Project A', 'Description for Task 2 in Project A', 'in progress', 'Medium'), (2, 'Task 1 for Project B', 'Description for Task 1 in Project B', 'done', 'Low');


/* Create the Projects_Teams junction table */
INSERT INTO projects_teams (project_id, team_id) VALUES (1, 1), (1, 2), (2, 3);

/* Create the Issues table */
INSERT INTO issues (issue_type_id, task_id, summary, attachments, description, reports_to, assignee_id, priority, label, status) VALUES (1, 1, 'Epic for Task 1', NULL, 'Description for Epic related to Task 1', NULL, 1, 'High', 'Feature', 'open'), (2, 1, 'Task 1', NULL, 'Description for Task 1', NULL, 1, 'High', 'Feature', 'in progress');


