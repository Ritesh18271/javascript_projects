const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3500;

//MYSQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "nodeapi",
});

db.connect((error) => {
  if (error) {
    console.log("Error connecting to the DB", error);
    return;
  }
  console.log("connenction succesfully");
});
app.use(bodyParser.json());

// Getting Employee Data from Database

app.get("/employees", (req, res) => {
  const query = "select name, city from emp";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error while getting data", err);
    } else {
      res.json(result);
    }
  });
});

// GET Employee City by employee name

app.post("/empCity", (req, res) => {
  let Name = req.body; // {name:"Suhas"}
  const query = `select city from emp where name = '${Name.name}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error while getting city by name", err);
    } else {
      res.json(result);
    }
  });
});

// GET employee by id
app.get("/employees/:id", (req, res) => {
  const query = `select name, city from emp where id = '${req.params.id}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error while getting data", err);
    } else {
      res.json(result);
    }
  });
});

// UPDATE Employee by id

app.put("/updateEmp/:id", (req, res) => {
  const updateQuery = `UPDATE  emp SET name='${req.body.name}',city='${req.body.city}' where id='${req.params.id}'`;
  db.query(updateQuery, (err, result) => {
    if (err) {
      console.log("Error while updating employee");
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
