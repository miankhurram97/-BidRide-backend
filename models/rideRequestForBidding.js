const Knex = require('knex')
const connection = require('../knexfile')
const { Model } = require('objection')
const knexConnection = Knex(connection)

Model.knex(knexConnection)

class rideRequestForBidding extends Model {
  static get tableName () {
    return 'riderequest'
  }

  
  
}

module.exports = { rideRequestForBidding }