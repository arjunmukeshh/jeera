Jeera.

Containerised task and access management application that uses JWT authorisation. The data is stored in a 3NF normalised MySQL database with input validation against SQL injection attacks. The application utilizes React, Fiber(Golang), MySQL and Docker. The user interface uses Material UI. It is reverse proxied using an Nginx server.

feature/ui is the developed branch as of 19th august.

clone the repo. 
git pull -u origin feature/ui

navigate to frotend/package.json
if windows user,
check if the run script contains SET PORT=3006 && react-scripts

if unix based OS
PORT=3006 && react-scripts

navigate to projects root directory.
docker-compose up --build

on your browser, open localhost:3000 to view the application! 

if this doesnt work, try feature/reverse_proxy and follow same steps.

close any MySQL port that is already running. go to task manager and search for mysqld.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/M4NvrXuV)
