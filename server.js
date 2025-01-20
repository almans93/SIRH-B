
    const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const cors = require('cors');

    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(express.json());

    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
      db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, role TEXT)");
      db.run("CREATE TABLE employees (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT, poste TEXT, departement TEXT, typeContrat TEXT, situationMatrimoniale TEXT, coordonnees TEXT, historiqueEmploi TEXT)");
      db.run("CREATE TABLE absences (id INTEGER PRIMARY KEY AUTOINCREMENT, employeeId INTEGER, date TEXT, type TEXT, status TEXT, FOREIGN KEY(employeeId) REFERENCES employees(id))");
      db.run("CREATE TABLE conges (id INTEGER PRIMARY KEY AUTOINCREMENT, employeeId INTEGER, dateDebut TEXT, dateFin