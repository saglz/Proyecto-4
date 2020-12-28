DROP DATABASE ACA_ESTA_EL_PROYECTO4;
CREATE DATABASE ACA_ESTA_EL_PROYECTO4;
USE ACA_ESTA_EL_PROYECTO4;

-- Table Creation
CREATE TABLE region (
  region_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (150) NOT NULL
);

INSERT INTO
  region
VALUES
  (NULL,"Africa"),
  (NULL,"Asia"),
  (NULL,"Europa"),
  (NULL,"Norteamerica"),
  (NULL,"Suramerica");


CREATE TABLE countries (
  countries_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (150) NOT NULL,
  region_id INT NOT NULL DEFAULT "0",
  FOREIGN KEY(region_id) REFERENCES region(region_id) ON DELETE CASCADE
);

INSERT INTO
  countries
VALUES
  (NULL,"Costa de marfil",1),
  (NULL,"Ghana",1),
  (NULL,"China",2),
  (NULL,"Japon",2),
  (NULL,"Alemania",3),
  (NULL,"España",3),
  (NULL,"Canada",4),
  (NULL,"Argentina",5),
  (NULL,"Colombia",5);


CREATE TABLE cities (
  cities_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (150) NOT NULL,
  countries_id INT NOT NULL DEFAULT "0",
  FOREIGN KEY(countries_id) REFERENCES countries(countries_id) ON DELETE CASCADE
);

-- Populate orders table
INSERT INTO
  cities
VALUES
  (NULL,"Abiyan",1),
  (NULL,"Yamusukro",1),
  (NULL,"Acra",2),
  (NULL,"Kumasi",2),
  (NULL,"Pekin",3),
  (NULL,"Wuhan",3),
  (NULL,"Tokio",4),
  (NULL,"Yokohama",4),
  (NULL,"Berlin",5),
  (NULL,"Munich",5),
  (NULL,"Barcelona",6),
  (NULL,"Madrid",6),
  (NULL,"Toronto",7),
  (NULL,"Quebec",7),
  (NULL,"Buenos aires",8),
  (NULL,"Ushuaia",8),
  (NULL,"Medellin",9),
  (NULL,"Cali",9);

CREATE TABLE companies (
  companies_id INT PRIMARY KEY AUTO_INCREMENT,
  nit INT NOT NULL,
  name VARCHAR (150) NOT NULL,
  phone INT NOT NULL,
  email VARCHAR (150) NOT NULL,
  address VARCHAR (150) NOT NULL,
  cities_id INT NOT NULL DEFAULT "0",  
  FOREIGN KEY(cities_id) REFERENCES cities(cities_id)
);

INSERT INTO
  companies
VALUES
  (NULL, 10, "Bancolombia", 2133456, "bancolombi@mail.com", "carrera 46 nro 2 - 111", 17),
  (NULL, 20, "Alpina", 4546655, "alpin@mail.com", "carrera 46 nro 2 - 111", 15),
  (NULL, 30, "Ecopetrol", 8789900, "ecopetrol@mail.com", "carrera 46 nro 2 - 111", 18);


CREATE TABLE contacts (
  contacts_id INT PRIMARY KEY AUTO_INCREMENT,
  id INT NOT NULL,
  name VARCHAR (150) NOT NULL,
  lastName VARCHAR (150) NOT NULL,
  email VARCHAR (150) NOT NULL,
  position VARCHAR (150) NOT NULL,
  channel VARCHAR (150) NOT NULL,
  interest INT NOT NULL,
  companies_id INT NOT NULL DEFAULT "0",  
  FOREIGN KEY(companies_id) REFERENCES companies(companies_id)
);

INSERT INTO
  contacts
VALUES
  (NULL, 123, "Elsa", "Polindo", "bancolombi@mail.com", "gerente", "whatsapp", 80, 1),
  (NULL, 456, "Belen","Gena", "alpin@mail.com", "comercial", "facebook, whatsapp", 50, 2),
  (NULL, 789, "Lucas","Trado", "ecopetrol@mail.com", "coordinador", "instagram", 33, 3);


-- ******************************* TABLA USUARIOS
CREATE TABLE users (
  consecutive INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  username VARCHAR (150) NOT NULL,
  password VARCHAR (150) NOT NULL,
  name VARCHAR (150) NOT NULL,
  lastName VARCHAR (150) NOT NULL,
  email VARCHAR (150) NOT NULL,
  profileAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO
  users
VALUES
  (NULL, 123, "omarGarita", "1234", "Omar", "Garita", "omar@mail.com", 0),
  (NULL, 456, "admin", "1234", "Gerente", "Compañía", "gerente@mail.com", 1),
  (NULL, 111, "santiago", "1234", "Santiago", "Arias", "santi.arias@mail.com", 1),
  (NULL, 222, "juan", "1234", "Juan", "laverde", "laverde@mail.com", 0);
