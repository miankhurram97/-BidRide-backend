const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
var session = require('express-session');


router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

router.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, session');
  res.header('Access-Control-Allow-Methods', 'DELETE,OPTIONS,POST, PUT, GET');
  res.header("Content-Type: application/json; charset=UTF-8");
  next();

});

const control = require('../controllers/usersController')

//with objection model
const { Person } = require('../models/usersModel')
const { loginUserLocation } = require('../models/usersLocationModel')


let Ajv = require('ajv')
let ajv = Ajv({ allErrors: true, removeAdditional: 'all' })
let userSchema = require('../new-userschema')
ajv.addSchema(userSchema, 'new-user')

function errorResponse(schemaErrors) {
  let errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message
    }
  })
  return {
    status: 'failed',
    errors: errors
  }
}
let validateSchema = (schemaName) => {
  return (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body)
    if (!valid) {
      return res.send(errorResponse(ajv.errors))
    }
    next()
  }
}

router.route('/welcome').get(control.homefunction);

router.route('/login').post(control.loginusers);
router.route('/logout').post(control.logoutusers);
router.route('/authorizeUser').post(control.getAuthorizeUser);
// validateUtil.validateSession()
router.route('/users').get(control.getallusers);
router.route('/allusers').get(control.allusers);
router.route('/getAllDriversLocation').get(control.getAllDriversLocation);
router.route('/saveUserLocation').post(control.SaveUserLocation);
router.route('/calculateDistance').post(control.calculateDistance);
router.route('/saveRideRequestForBidding').post(control.saveRideRequestForBidding);
router.route('/cancelRideRequestForBidding').post(control.cancelRideRequestForBidding);
router.route('/getRideRequestForBiddings').get(control.getRideRequestForBiddings);
router.route('/savePriceAgainstBid').post(control.savePriceAgainstBidFunction);
router.route('/getBiddingsByDrivers').post(control.getBiddingsByDrivers);
router.route('/manageSelectedRide').post(control.manageSelectedRide);
router.route('/getUserByUserId').post(control.getUserByUserId);
router.route('/getLocationByUserId').post(control.getLocationByUserId);
router.route('/completeUserRide').post(control.completeUserRide);
router.route('/getTravelHistoryByUserId').post(control.getTravelHistoryByUserId);
router.route('/updateUser').post(control.updateUser);
router.route('/getManageRideById').post(control.getManageRideById);
router.route('/getAllUsers').post(control.getAllUsers);
router.route('/getAllDrivers').post(control.getAllDrivers);
router.route('/getAllTravelHistory').post(control.getAllTravelHistory);
router.route('/resetPassword').post(control.resetPassword);
router.route('/logOutUser').post(control.logOutUser);
router.route('/updateusers').put(control.updateuserdata), validateSchema('new-user');
router.route('/update').post(control.updatedata);
router.route('/deleteusers').delete(control.deleteuserbyid);
router.route('/deleteuser').options(control.deleteuser);
router.route('/searchusers').get(control.searchusers);

router.route('/postusers').post(control.postuserdata), validateSchema('new-user');

module.exports = router;

