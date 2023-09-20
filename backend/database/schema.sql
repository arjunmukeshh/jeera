CREATE DATABASE jeera;
USE jeera;

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

/* Create the Issues table */
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
    team_id INT,
    PRIMARY KEY (project_id, team_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);



/* Create the Issues_Teams junction table */
CREATE TABLE issues_teams (
    issue_id INT,
    team_id INT,
    PRIMARY KEY (issue_id, team_id),
    FOREIGN KEY (issue_id) REFERENCES issues(issue_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);




