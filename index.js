const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// create database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// create form table
db.serialize(() => {
  db.run('CREATE TABLE forms (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT NOT NULL, temperature INTEGER, description TEXT NOT NULL)');
});

// create new form response
app.post('/', (req, res) => {
  const { city, temperature, description } = req.body;

  // validate input
  if (!city || !description) {
    return res.status(400).send('City and description are required fields');
  }

  // insert form data into database
  db.run(`INSERT INTO forms (city, temperature, description) VALUES (?, ?, ?)`, [city, temperature, description], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    // return newly created form id
    res.status(201).send({ id: this.lastID });
  });
});

// get form response by id
app.get('/:id', (req, res) => {
  const id = req.params.id;
  // retrieve form data from database
  db.get(`SELECT * FROM forms WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!row) {
      return res.status(404).send('Form not found');
    }
    // return form data
    res.send(row);
  });
});

// get all form responses
app.get('/', (req, res) => {
  // retrieve all form data from database
  db.all(`SELECT * FROM forms`, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // return form data
    res.send(rows);
  });
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
