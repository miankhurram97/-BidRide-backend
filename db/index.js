
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()

// for postgress
// const {Client}=require('pg')

// const client = new Client({
// user:"postgres",
// password:"12345",
// host:"localhost",
// port:5432,
// database:"mydata"
// })

// client.connect()
// .then(()=>console.log("Connected successfuly"))
// .catch(e=>console.log())
// .finally(()=>client.end())



module.exports = router;
