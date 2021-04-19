const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydata',
  password: '12345',
  port: 5432,
})




const getUsers = (request, response,next) => {
    console.log('request-->'+request.body);
    console.log('request-->'+JSON.stringify(request.body));
    pool.query('SELECT * FROM test_data ORDER BY user_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response,next) => {
    const user_id = parseInt(request.params.user_id)
  
    pool.query('SELECT * FROM test_data WHERE user_id = $1', [user_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  } 

  
  const createUser = (request, response,) => {
     console.log(JSON.stringify(request.body));
    const { user_name,user_email,user_password } = request.body
  
    pool.query('INSERT INTO test_data (user_name, user_email,user_password) VALUES ($1, $2,$3)', [user_name, user_email,user_password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User added with ID: ${user_email}`)
    })
  }
  
  const updateUser = (request, response) => {
    console.log(request.body);
    const user_id = parseInt(request.params.user_id)
    const { user_name, user_email,user_password } = request.body
  
    pool.query(
      'UPDATE test_data SET  user_name = $1, user_email = $2,user_password=$3 WHERE user_id = $4',
      [user_name, user_email,user_password, user_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${user_id}`)
      }
    )
  }
 
  
  const deleteUser = (request, response,next) => {
    const user_id = parseInt(request.params.user_id)
  
    pool.query('DELETE FROM test_data WHERE user_id = $1', [user_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${user_id}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }