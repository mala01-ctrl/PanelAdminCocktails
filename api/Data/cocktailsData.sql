DROP DATABASE IF EXISTS cocktails ;
CREATE DATABASE cocktails;
USE cocktails;

CREATE TABLE cocktails(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    alcoholContent int NOT NULL,
    description varchar(255)
);

CREATE TABLE Users(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(255)
);

