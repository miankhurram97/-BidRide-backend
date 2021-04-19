
const mysql = require('mysql')
module.exports = {
  client: 'mysql',
  connection: {
    user: 'root',
    host: 'localhost',
    database: 'test',
    password: 'root',
    port: 3306,
  }
}
// const pg = require('pg')


// module.exports = {
//   client: 'pg',
//   connection: {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'mydata',
//     password: '12345',
//     port: 5432,
//   }
// }