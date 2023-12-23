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

## Requirements

This is a fully containerised application. Requires [Docker](https://docs.docker.com/get-docker/).

## Screenshots

![image](https://github.com/arjunmukeshh/jeera/assets/60224351/b4ecd74b-4074-4183-9113-1f0fb1438240)

![image](https://github.com/arjunmukeshh/jeera/assets/60224351/4e2430d4-64cb-4b22-bd78-6fb45a2c7d55)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/0446c99b-bfd8-4d34-beed-19c6ec25cf21)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/f8e5829b-6a8d-440a-944e-9b538f014745)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/2ccedee1-742c-4d41-893d-2c5ca63c3e10)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/2be4da78-490b-4b4e-8a21-685f47ba5fb3)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/b42018b2-e830-4596-a3c0-53edcaefd0fa)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/032dcecd-74f0-4654-ad5f-62b2138b119f)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/e08fda7e-5a1e-4e28-b4c8-95dc0311e42c)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/59e93049-d66c-411a-9258-04977eab1776)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/05b08ee7-c5e3-42f2-a487-940b6b1a24a8)

An Admin User Can look at Other users.
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/216df4c2-5e24-4876-9c9d-cea30814b274)
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/c6e51bd7-1f38-4ff5-a662-9ab516960cbc)

Error page for JWT token expiry or other errors
![image](https://github.com/arjunmukeshh/jeera/assets/60224351/e0fa8ba6-4961-4b03-9b16-ad28155aade4)

## Running Jeera

1. Clone the git repository into your local machine.

2. Ensure that the docker-engine is running using `docker ps` command.

3. Ensure that the the ports *80, 3000, 3001 and 3306* are free. Otherwise, [kill any processes that use these ports.](https://linuxhint.com/kill-process-currently-using-port-localhost-windows/) 

4. Navigate to the local repository and perform `docker-compose up --build`. For the first time, the backend will fail to run. 

5. On a browser, navigate to localhost:8080 to open an adminer tab. Login using the credentials 'db', 'root', 'example' leaving the database field empty. 

6. In the adminer homepage, click on the `SQL command` link present in the left side of the screen. Copy all the SQL commands in *project/backend/database/sample_data.sql* file and paste in the provided field. Execute the queries. After success, you can exit the Adminer page and close the browser. Once the database is created, the data persists in the db volume for subsequent builds.

7. Now, navigate to the projects directory and perform `docker-compose up --build` again. Data persists using db volume for any future builds.

8. The application runs successfully and you can access it on `localhost:3000`. If reverse proxy is used, uncomment the /api in frontend/src/config/config.js and try localhost:80. 

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

If a users account is deleted, their account is removed from the users database. Data retention policies vary from country to country and in some cases, from state to state. The most one-size-fits-all solution to it is to not retain any data. Therefore, it is upto the admin to ensure that data integrity is maintained by reassigning a different user as a maintainer and so on. Cascading deletes should not cause unexpected loss of data. A delete requires related records to be deleted, and the user need to know that those records are going to go away. In this case, cascading deletes are not used. Instead, the administrator is required to explicitly delete the related records.

On creation of every account, the field "active" is set to "1". On disabling the user account, it is set to "0". User is logged out and their JWT token is removed. They cannot log back in unless an admin toggles the activate button in their user control panel.

### Reverse proxy

We use an Nginx server to enable reverse proxying. All requests to the backend are routed through Nginx. This is configured in the Nginx folder. The docker-compose.yaml sets up Nginx server. 

All API calls from the frontend are routed through '/api/'. This is setup in API_BASE_URL in frontend/src/config/config.js



In case of Nginx setup failure, please comment out the API_BASE_URL='/api' and uncomment the API_BASE_URL='http://localhost:3001' and run the project again. 

> While adding a team, make sure the teamname doesn't contain any white space character

Admin account -> john_doe
Password -> password123

Non-admin account -> jane_doe
Password -> password456

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/M4NvrXuV)
