# Jeera

Jeera is a containerised task and access management application that uses JWT authorisation. The data is stored in a 3NF normalised MySQL database with input validation against SQL injection attacks. The application utilizes React, Fiber(Golang), MySQL and Docker. The user interface uses Material UI. It is reverse proxied using an Nginx server.

Jeera is a common Indian spice. Although it appears small and insignificant, it is an essential part of many recipes. Jeera, the task management app, performs a similar seemingly small but crucial role in product development.

## Features

1. Create and manage projects, tasks and issues. 

2. Assign and classify tasks and issues based on priority and status.

3. Uses bcrypt to hash passwords. 

4. IAM at the Project, Task and Issue levels. Safe deletion of user account and deactivation.

5. Bulk upload of .csv files.

6. JWT authorisation. 

7. Containerised application.

8. Reverse-proxied using Nginx. 
## Requirements

This is a fully containerised application. Requires [Docker](https://docs.docker.com/get-docker/).

## Running Jeera

1. Clone the git repository into your local machine.

2. Ensure that the docker-engine is running using `docker ps` command.

3. Ensure that the the ports *80, 3000, 3001 and 3306* are free. Otherwise, [kill any processes that use these ports.](https://linuxhint.com/kill-process-currently-using-port-localhost-windows/) 

4. Navigate to the local repository and perform `docker-compose up --build`. For the first time, the backend will fail to run. If it doesn't exit after failure, perform Ctrl+C to force exit.

5. On a browser, navigate to localhost:8080 to open an adminer tab. Login using the credentials 'db', 'root', 'example' leaving the database field empty. 

6. In the adminer homepage, click on the `SQL command` link present in the left side of the screen. Copy all the SQL commands in *project/backend/database/sample_data.sql* file and paste in the provided field. Execute the queries. After success, you can exit the Adminer page and close the browser.

7. Now, navigate to the projects directory and perform `docker-compose up --build` again. Data persists using db volume for any future builds.

8. The application runs successfully and you can access it on `localhost:3000`

## Permissions and Access Management

| Permission for                   | isAdmin | maintainer | reports_to | assignee | user belonging to team with writeTasks | user belonging to team with writeIssues |
|----------------------------------|---------|------------|------------|----------|----------------------------------------|-----------------------------------------|
| Add Teams to App                 | true    | false      | false      | false    | false                                  | false                                   |
| Add Users to App                 | true    | false      | false      | false    | false                                  | false                                   |
| Add Projects to App              | true    | false      | false      | false    | false                                  | false                                   |
| Delete/Edit Project from App     | true    | true       | false      | false    | false                                  | false                                   |
| Add teams to each Project        | true    | true       | false      | false    | false                                  | false                                   |
| Remove teams from each Project   | true    | true       | false      | false    | false                                  | false                                   |
| Add a user into a team           | true    | false      | false      | false    | false                                  | false                                   |
| Setting writeTasks,writeIssues   | true    | true       | false      | false    | false                                  | false                                   |
| Add a task                       | true    | true       | false      | false    | true                                   | false                                   |
| Edit/Delete a task               | true    | true       | false      | false    | true                                   | false                                   |
| Add issues to a task             | true    | true       | true       | false    | true                                   | true                                    |
| Delete issues in a task          | true    | true       | true       | false    | true                                   | true                                    |
| Edit issues and status of issues | true    | true       | true       | true     | true                                   | true                                    |
## Notes

Every user of Jeera has a property called isAdmin that denotes whether or not the particular user is an admin. Admin users have all-encompassing powers over the application and can only be set directly by interaction with the Database. In the provided example, `john_doe` is a user who has admin privileges.

The 3NF normalisation and further structure of the relational database can be inferred from the diagram below. 

![image](https://github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/assets/60224351/97d0d780-3531-47ce-bb41-1edfbd881fbe)


### Bulk Upload

We can use bulk upload option using a .csv file to Add Users to App, Add Tasks to Project and Add Issues to a Task.

These are the formats.

Adding Users to the App -
username,full_name,email_id,isAdmin

Adding Tasks to a project - 
name,description,status,priority

Adding Issues to a task - 
issue_type_id,summary,attachments,description,reports_to,assignee_id,priority,label,status

Sample .csv files are present in backend/database directory.

### Access

Only an admin can create other users. Users created by an admin cannot be admins. In order to make the user an administrator, a database admin must manually set their isAdmin field to true.

#### Deleting and Disabling accounts.

If a users account is deleted, their account is removed from all databases that reference it and the database entry is deleted. For example, it is removed from the users table, team_members,projects table and so on. Data retention policies vary from country to country and in some cases, from state to state. The most one-size-fits-all solution to it is to not retain any data. Therefore, it is upto the admin to ensure that data integrity is maintained by reassigning a different user as a maintainer and so on.

On creation of every account, the field "active" is set to "1". On disabling the user account, it is set to "0". User is logged out and their JWT token is removed. They cannot log back in unless an admin toggles the activate button in their user control panel.

### Reverse proxy

We use an Nginx server to enable reverse proxying. All requests to the backend are routed through Nginx. This is configured in the Nginx folder. The docker-compose.yaml sets up Nginx server. 

All API calls from the frontend are routed through '/api/'. This is setup in API_BASE_URL in frontend/src/config/config.js

In case of Nginx setup failure, please comment out the API_BASE_URL='/api' and uncomment the API_BASE_URL='http://localhost:3001' and run the project again. 

> While adding a team, make sure the teamname doesn't contain any white space character

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/M4NvrXuV)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/M4NvrXuV)
