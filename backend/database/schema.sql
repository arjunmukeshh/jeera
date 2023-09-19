--MySQL schema that is 3NF normalised

-- Create the Users tabl
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
);

-- Create the Roles table
CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the User_Roles junction table
CREATE TABLE User_Roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Create the Teams table
CREATE TABLE Teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the Team_Members junction table
CREATE TABLE Team_Members (
    team_id INT,
    user_id INT,
    PRIMARY KEY (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create the Team_Roles junction table
CREATE TABLE Team_Roles (
    team_id INT,
    role_id INT,
    PRIMARY KEY (team_id, role_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Create the IssueTypes table
CREATE TABLE IssueTypes (
    issue_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('Epic', 'Task', 'Story', 'Bug') NOT NULL
);

-- Create the Issues table
CREATE TABLE Issues (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    issue_type_id INT,
    summary VARCHAR(255) NOT NULL,
    attachments TEXT,
    description TEXT,
    reports_to INT,
    assignee_id INT,
    priority VARCHAR(50),
    label VARCHAR(255),
    status ENUM('in progress', 'open', 'closed', 'resolved') DEFAULT 'open',
    FOREIGN KEY (issue_type_id) REFERENCES IssueTypes(issue_type_id),
    FOREIGN KEY (assignee_id) REFERENCES Users(user_id)
);

-- Create the LinkedIssues junction table
CREATE TABLE LinkedIssues (
    issue_id INT,
    linked_issue_id INT,
    PRIMARY KEY (issue_id, linked_issue_id),
    FOREIGN KEY (issue_id) REFERENCES Issues(issue_id),
    FOREIGN KEY (linked_issue_id) REFERENCES Issues(issue_id)
);

-- Create the Labels table
CREATE TABLE Labels (
    label_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the Issues_Labels junction table
CREATE TABLE Issues_Labels (
    issue_id INT,
    label_id INT,
    PRIMARY KEY (issue_id, label_id),
    FOREIGN KEY (issue_id) REFERENCES Issues(issue_id),
    FOREIGN KEY (label_id) REFERENCES Labels(label_id)
);

-- Create the Projects table
CREATE TABLE Projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    maintainer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maintainer_id) REFERENCES Users(user_id)
);

-- Create the Tasks table
CREATE TABLE Tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('to do', 'done', 'in progress') DEFAULT 'to do',
    priority VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

-- Create the Tasks_Teams junction table
CREATE TABLE Tasks_Teams (
    task_id INT,
    team_id INT,
    PRIMARY KEY (task_id, team_id),
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

-- Create the Tasks_Roles junction table
CREATE TABLE Tasks_Roles (
    task_id INT,
    role_id INT,
    PRIMARY KEY (task_id, role_id),
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Create the Projects_Teams junction table
CREATE TABLE Projects_Teams (
    project_id INT,
    team_id INT,
    PRIMARY KEY (project_id, team_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

-- Create the Projects_Roles junction table
CREATE TABLE Projects_Roles (
    project_id INT,
    role_id INT,
    PRIMARY KEY (project_id, role_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Create the Issues_Teams junction table
CREATE TABLE Issues_Teams (
    issue_id INT,
    team_id INT,
    PRIMARY KEY (issue_id, team_id),
    FOREIGN KEY (issue_id) REFERENCES Issues(issue_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

-- Create the Issues_Roles junction table
CREATE TABLE Issues_Roles (
    issue_id INT,
    role_id INT,
    PRIMARY KEY (issue_id, role_id),
    FOREIGN KEY (issue_id) REFERENCES Issues(issue_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Create the Teams_Projects junction table
CREATE TABLE Teams_Projects (
    team_id INT,
    project_id INT,
    PRIMARY KEY (team_id, project_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

-- Create the Teams_IssueTypes junction table
CREATE TABLE Teams_IssueTypes (
    team_id INT,
    issue_type_id INT,
    PRIMARY KEY (team_id, issue_type_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (issue_type_id) REFERENCES IssueTypes(issue_type_id)
);
