const Knex = require('knex')
const connection = require('../knexfile')
const { Model } = require('objection')
const knexConnection = Knex(connection)

Model.knex(knexConnection)

class completedRides extends Model {
  static get tableName () {
    return 'completerides'
  }

  
  
}

module.exports = { completedRides }