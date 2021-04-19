const Knex = require('knex')
const connection = require('../knexfile')
const { Model } = require('objection')
const knexConnection = Knex(connection)

Model.knex(knexConnection)

class loginUserLocation extends Model {
  static get tableName () {
    return 'usersLocation'
  }

  
  
}

module.exports = { loginUserLocation }