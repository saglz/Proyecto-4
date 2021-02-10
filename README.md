# Data Warehouse Project

- Development for a marketing company to manage all the contacts of your customers and campaigns.
- Frontend and Backend with CRUD operations to database (datawarehouse).

# Requirements
- Node.js
- XAMPP, MySQL

# Instalation

## 1. Clone Project
Clone the repository from terminal:

- git clone https://github.com/saglz/Proyecto-4.git

## 2. NodeJS
Install [NodeJS](https://nodejs.org/es/).

## 3. Database Server
Install and configure  [MYSQL](https://www.mysql.com/).

Install and configure [XAMMP](https://www.apachefriends.org/es/index.html) .

## 4. Create Database
- Open XAMPP and start Apache Web Server and MySQL Database in port `3306`.
- Open phpMyAdmin.
- Modify in the file `.env` whith de next data:
DB_HOST=localhost
DB_NAME=aca_esta_el_proyecto4
DB_USER=root
DB_PASS=
DB_PORT=3306
SECRET=PROJECT4
- Import script: `database.sql` (Folder: backend) to create schema and parameters of database. 

## 5. Install Dependencies
In terminal (IDE) execute in Backend Folder (cd backend):

- npm install

## 6. Start Backend App 
In terminal (IDE) run ONE of the these commands in Backend Folder:

- node server.js
- nodemon server.js

## 7. App Ready
Message in terminal (IDE): 

'Server running on port 3000.  
Connection Database.'

## 8. Start Frontend
- Open file `index.html` (Folder: frontend) with Live Server on Port: 5500.
- Enter Username and Password registered in database. 

## 9. Website
Browse the website where you can do CRUD operations in the sections of Contacts, Companies, Users (Administrative access) and Region/Country/City.


# Technologies & Resources:
-   Node.js
-   Nodemon
-   XAMPP
-   MySQL
-   Express
-   Sequelize 
-   Json Web Token 
-   Dotenv
