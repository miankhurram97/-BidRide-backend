const express = require('express')
const app = express()

const bodyParser = require('body-parser');

const { Person } = require('../models/usersModel');
const { loginUserLocation } = require('../models/usersLocationModel');
const { rideRequestForBidding } = require('../models/rideRequestForBidding');
const { savePriceAgainstBid } = require('../models/savePriceAgainstBid');
const { manageRide } = require('../models/manageRdie');
const { completedRides } = require('../models/completedRides');
const uuidtoken = require('uuid');
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

const myFunctions = require('../validateUtil');
const { request } = require('express');

homefunction = async function (req, res) {
  console.log('<===========  Response of users =====================>');
  res.render("home", { tittle: "Welcome" });
}

loginusers = async function (req, res) {
  // const fetchdata= myFunctions.validateLogin;
  const fetchdata = await Person.query().findOne({ user_email: req.body.user_email, user_password: req.body.user_password });

  console.log(fetchdata);
  if (fetchdata) {
    console.log('user  found')

    const tokenuuid = uuidtoken(req.body.user_email, MY_NAMESPACE);

    // res.render('function', { login: req.body.user_email, utoken: tokenuuid });
    const savetoken = await Person.query().where({ user_email: req.body.user_email }).update({ user_utoken: tokenuuid }).returning('*');
    const loginUserData = await Person.query().where({ user_email: req.body.user_email });
    const updateUserActive = await Person.query().where({ user_email: req.body.user_email }).update({ active: true }).returning('*');
    req.body.user_location.user_name = loginUserData[0].user_firstname;
    req.body.user_location.phone = loginUserData[0].user_phone;

    const updatedLocation = await loginUserLocation.query().where({ user_id: loginUserData[0].id }).update(req.body.user_location).returning('*');
    const getLocationByUserId = await loginUserLocation.query().findOne({ user_id: loginUserData[0].id });

    res.send({
      "user email": req.body.user_email,
      message: 'User Login Successfully',
      result: {
        address: "aaaa",
        city: "Makkah",
        cityId: 37420,
        companyCount: 10,
        country: "Pakistan",
        countryCode: "+923",
        countryId: 191,
        dob: "02/01/2018",
        email: loginUserData[0].user_email,
        firstName: loginUserData[0].user_firstname,
        isActive: true,
        active: updateUserActive == 0 ? false : true,
        isResetPassword: "N",
        lastName: loginUserData[0].user_lastname,
        phone: loginUserData[0].user_phone,
        role: "USER",
        driver: fetchdata.user_driver == 0 ? false : true,
        user_rideHistory: fetchdata.user_rideHistory == 0 ? false : true,
        session: loginUserData[0].user_utoken,
        password: loginUserData[0].user_password,
        state: "Makkah",
        stateId: 3155,
        userDetailId: 2,
        userId: loginUserData[0].id,
        userName: loginUserData[0].user_email,
        ride_option_id: loginUserData[0].ride_option_id,
        ride_option_name: loginUserData[0].ride_option_name,
        zipCode: "43032"
      },
      location: getLocationByUserId
    });
  }
  if (!fetchdata) {
    console.log('user not found')
    res.send({
      "user email": req.body.user_email,
      message: 'Invalid email address or password'
    });
  }
}
getUserByUserId = async function (req, res) {
  const loginUserData = await Person.query().where({ id: req.body.user_id }).returning('*');
  console.log(loginUserData);
  res.send({
    "user email": loginUserData[0].user_email,
    message: 'User get Successfully',
    result: {
      address: "aaaa",
      city: "Makkah",
      cityId: 37420,
      companyCount: 10,
      country: "Pakistan",
      countryCode: "+923",
      countryId: 191,
      dob: "02/01/2018",
      email: loginUserData[0].user_email,
      firstName: loginUserData[0].user_firstname,
      isActive: true,
      active: loginUserData[0].active == 0 ? false : true,
      isResetPassword: "N",
      lastName: loginUserData[0].user_lastname,
      phone: loginUserData[0].user_phone,
      role: "USER",
      driver: loginUserData[0].user_driver == 0 ? false : true,
      user_rideHistory: loginUserData[0].user_rideHistory == 0 ? false : true,
      session: loginUserData[0].user_utoken,
      password: loginUserData[0].user_password,
      state: "Makkah",
      stateId: 3155,
      userDetailId: 2,
      userId: loginUserData[0].id,
      userName: loginUserData[0].user_email,
      ride_option_id: loginUserData[0].ride_option_id,
      ride_option_name: loginUserData[0].ride_option_name,
    },
  });
}
SaveUserLocation = async function (req, res) {
  const updateUserLocation = await loginUserLocation.query().where({ user_email: req.body.user_email }).update(req.body).returning('*');
  const getLocationByUserId = await loginUserLocation.query().findOne({ user_email: req.body.user_email });
  console.log(getLocationByUserId);
  res.send({ code: 200, result: getLocationByUserId });
}
//get Lcaotion by userId
getLocationByUserId = async function (req, res) {
  const getLocationByUserId = await loginUserLocation.query().findOne({ user_id: req.body.user_id });
  res.send({ code: 200, result: getLocationByUserId });
}
//update user 
updateUser = async function (req, res) {
  const fetchdata = await Person.query().where({ id: req.body.id }).update({
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_email: req.body.user_email,
    user_phone: req.body.user_phone,
    user_password: req.body.user_password
  }).returning('*');
  const loginUserData = await Person.query().where({ id: req.body.id }).returning('*');
  res.send({
    message: 'User update successfully',
    result: {
      address: "aaaa",
      city: "Makkah",
      cityId: 37420,
      companyCount: 10,
      country: "Pakistan",
      countryCode: "+923",
      countryId: 191,
      dob: "02/01/2018",
      email: loginUserData[0].user_email,
      firstName: loginUserData[0].user_firstname,
      isActive: true,
      active: loginUserData[0].active == 0 ? false : true,
      isResetPassword: "N",
      lastName: loginUserData[0].user_lastname,
      phone: loginUserData[0].user_phone,
      role: "USER",
      driver: loginUserData[0].user_driver == 0 ? false : true,
      user_rideHistory: loginUserData[0].user_rideHistory == 0 ? false : true,
      session: loginUserData[0].user_utoken,
      password: loginUserData[0].user_password,
      state: "Makkah",
      stateId: 3155,
      userDetailId: 2,
      userId: loginUserData[0].id,
      userName: loginUserData[0].user_email,
      ride_option_id: loginUserData[0].ride_option_id,
      ride_option_name: loginUserData[0].ride_option_name,
    },
  });
}
//logout function start
logoutusers = async function (req, res) {
  console.log('<===========data of user to be updated  =================>')
  console.log(req.query.user_email);

  const fetchdata = await Person.query().where({ user_email: req.body.user_email }).update({ user_utoken: null }).returning('*');
  console.log('<===========  Response of users =====================>')

  // res.json({ "logout as": req.query.user_email });
  res.send({ "logout": req.body.userId, result: fetchdata });
}

logOutUser = async function (req, res) {
  console.log('<===========data of user to be updated  =================>')

  const fetchdata = await Person.query().where({ user_email: req.body.userId }).update({ user_utoken: null }).returning('*');
  console.log('<===========  Response of users =====================>')

  res.send({
    "logout": req.body.userId, result: fetchdata,
    currentLanguage: req.body.currentLanguage,
    languageOrientation: req.body.languageOrientation,
    currentLanguageName: req.body.currentLanguageName,
  });
}
//alluser function start 
allusers = async function (req, res) {

  console.log('<===========Get all users list =================>')
  const fetchdata = await Person.query().orderBy('user_id');
  console.log(fetchdata);

  console.log('<===========  Response of users =====================>')
  res.json(fetchdata);

  //        console.log('<=========== stringify data =====================>')
  // var stringified = JSON.stringify(fetchdata);
  //   console.log(stringified)
  // console.log('<=========== json parse data =====================>')
  //   var parsedObj = JSON.parse(stringified);
  //   console.log(parsedObj);

};
//calculate distance
calculateDistance = async function (req, res) {
  var distance = require('google-distance-matrix');

  var origins = [`${req.body.origin.lat},${req.body.origin.lng}`];
  var destinations = [`${req.body.destination.lat},${req.body.destination.lng}`];
  distance.key('AIzaSyASP_B-WHbqF6sPqL5n2t2vGbmN8OzLsfQ');
  distance.mode('driving');
  distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
      res.send(distances)
  })
};

//save ride request for bidding
saveRideRequestForBidding = async function (req, res) {
  const saveRide = await rideRequestForBidding.query().where({ user_id: req.body.user_id });
  console.log(saveRide);
  if (saveRide.length) {
    res.send({ error: "ride request for bidding already exists" })
  }
  else {
    const fetchdata = await rideRequestForBidding.query().insert(req.body).returning('*');
    const updateUserActive = await Person.query().where({ id: req.body.user_id }).update({ rideStatus: true }).returning('*');
    if (fetchdata) {
      res.send({
        user_id: fetchdata.user_id,
        rideStatus: updateUserActive == 0 ? false : true,
        message: 'Ride Request Generated',
      });
    }
  }
}
//get ride request for bidding
getRideRequestForBiddings = async function (req, res) {
  const fetchdata = await rideRequestForBidding.query().orderBy('created_at');
  res.send(fetchdata);
}
//save price against bid
savePriceAgainstBidFunction = async function (req, res) {
  const fetchdata = await savePriceAgainstBid.query().insert(req.body).returning('*');
  res.send({ result: fetchdata, success: 'Bid save successfully' })
}
//cancel ride request for bidding
cancelRideRequestForBidding = async function (req, res) {
  const deleteBiddingRequest = await rideRequestForBidding.query().where({ user_id: req.body.user_id }).del();
  const deleteBiddingOnRequest = await savePriceAgainstBid.query().where({ user_id: req.body.user_id }).del();
  if (deleteBiddingRequest && deleteBiddingOnRequest) {
    res.send({ success: 'ok' });
  } else {
    res.send({ success: 'fail' });
  }
}
//get biddings by drivers
getBiddingsByDrivers = async function (req, res) {

  const fetchdata = await savePriceAgainstBid.query().where({ user_id: req.body.id }).returning('*');
  res.send(fetchdata)
}

//manage ride between user and driver after user select the driver
manageSelectedRide = async function (req, res) {
  const fetchdata = await manageRide.query().insert(req.body).returning('*');
  const data = await manageRide.query().where({ driverId: req.body.driverId, userId: req.body.userId }).returning('*');
  const updateUserRidehistory = await Person.query().where({ id: req.body.userId }).update({ user_rideHistory: true }).returning('*');
  const updateDriverRidehistory = await Person.query().where({ id: req.body.driverId }).update({ user_rideHistory: true }).returning('*');
  const deleteBiddingRequest = await rideRequestForBidding.query().where({ user_id: req.body.userId, }).del();
  const deleteBiddingOnRequest = await savePriceAgainstBid.query().where({ user_id: req.body.userId, }).del();
  console.log(fetchdata,
    updateUserRidehistory,
    updateDriverRidehistory,
    deleteBiddingRequest,
    deleteBiddingOnRequest);
  if (fetchdata && updateUserRidehistory && updateDriverRidehistory && deleteBiddingRequest && deleteBiddingOnRequest) {
    res.send({ success: 'ok', user_id: req.body.userId, result: data });
  }
}
completeUserRide = async function (req, res) {
  const data = await manageRide.query().where({ driverId: req.body.driverId, userId: req.body.userId }).returning('*');
  data[0].completed = req.body.completed;
  delete data[0].id;
  const newData = await completedRides.query().insert(data[0]).returning('*');
  const updateUserRidehistory = await Person.query().where({ id: req.body.userId }).update({ user_rideHistory: false }).returning('*');
  const updateDriverRidehistory = await Person.query().where({ id: req.body.driverId }).update({ user_rideHistory: false }).returning('*');
  const deleteBiddingRequest = await rideRequestForBidding.query().where({ user_id: req.body.userId, }).del();
  const deleteBiddingOnRequest = await savePriceAgainstBid.query().where({ user_id: req.body.userId, }).del();
  const userInfo = await Person.query().where({ id: req.body.userId }).returning('*');
  const driverInfo = await Person.query().where({ id: req.body.driverId }).returning('*');
  // const newdata = await completedRides.query().where({ driverId: '31', userId: '8' }).returning('*');
  // const newData = newdata[0];
  var nodemailer = require('nodemailer');
  const gmailEmail = 'miankhurram9797@gmail.com';
  const gmailPassword = 'Khurram119788';
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bidrideofficial@gmail.com',
      pass: 'Khurram119788'
    }
  });
  const email = '';

  var userMailOptions = {
    from: 'miankhurram9797@gmail.com',
    to: 'miankhurram9797@gmail.com',
    subject: 'Travel with BidRide',
    text: "Hello world?",
    html: `<h1>Thanks For ridding with BidRide</h1><br>
    <p>
    Drop Location : ${newData.dropLocation}<br>
    Pick-up Location : ${newData.pickLocation}<br>
    Ride : ${newData.rideOptionName}<br>
    distance : ${newData.distance}<br>
    Estimated Price : ${newData.estimatedPrice}<br>
    Payment Received Amount : ${newData.paymentReceivedAmount}<br>
    Completed : ${newData.completed == '1' ? true : false}<br>
    </p>`
  };
  transporter.sendMail(userMailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('Email: ' + mailOptions);

      email = 'Email sent: ' + info.response;
    }
  });
  var driverMailOptions = {
    from: 'miankhurram9797@gmail.com',
    // to: `${driverInfo[0].user_email}`,
    to: 'miankhurram9797@gmail.com',
    subject: 'Travel with BidRide',
    text: "Hello world?",
    html: `<h1>Thanks For ridding with BidRide</h1><br>
    <p>
    Drop Location : ${newData.dropLocation}<br>
    Pick-up Location : ${newData.pickLocation}<br>
    Ride : ${newData.rideOptionName}<br>
    distance : ${newData.distance}<br>
    Estimated Price : ${newData.estimatedPrice}<br>
    Payment Received Amount : ${newData.paymentReceivedAmount}<br>
    Completed : ${newData.completed == '1' ? true : false}<br>
    </p>`
  };
  transporter.sendMail(driverMailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('Email: ' + mailOptions);

      email = 'Email sent: ' + info.response;
    }
  });
  res.send({
    success: 'ok',
    email: email,
    message: 'Ride completed successfully invoice send to your email'
  })
}
// get manage ride by userid 
getManageRideById = async function (req, res) {
  if (req.body.driverId) {
    const data = await manageRide.query().where({ driverId: req.body.driverId }).returning('*');
    res.send(data)
  } else {
    const data = await manageRide.query().where({ userId: req.body.userId }).returning('*');
    res.send(data)
  }
}
//get user travel history by user id
getTravelHistoryByUserId = async function (req, res) {
  if (req.body.userId) {
    if (req.body.searchKeywords) {
      var data = await completedRides.query().where({ userId: req.body.userId, dropLocation: req.body.searchKeywords }).returning('*');
      if (!data.length) {
        data = await completedRides.query().where({ userId: req.body.userId, pickLocation: req.body.searchKeywords }).returning('*');
        if (!data.length) {
          data = await completedRides.query().where({
            userId: req.body.userId, rideOptionName: req.body.searchKeywords
          }).returning('*');
          if (!data.length) {
            data = await completedRides.query().where({
              userId: req.body.userId, paymentReceivedAmount: Number(req.body.searchKeywords),
            }).returning('*');
          }
        }
      }
      res.send({
        success: 'ok',
        result: data
      })
    } else {
      const data = await completedRides.query().where({ userId: req.body.userId }).returning('*');
      res.send({
        success: 'ok',
        result: data
      })
    }
  } else {
    if (req.body.searchKeywords) {
      var data = await completedRides.query().where({ driverId: req.body.driverId, dropLocation: req.body.searchKeywords }).returning('*');
      if (!data.length) {
        data = await completedRides.query().where({ driverId: req.body.driverId, pickLocation: req.body.searchKeywords }).returning('*');
        if (!data.length) {
          data = await completedRides.query().where({ driverId: req.body.driverId, rideOptionName: req.body.searchKeywords }).returning('*');
          if (!data.length) {
            data = await completedRides.query().where({ driverId: req.body.driverId, paymentReceivedAmount: Number(req.body.searchKeywords), }).returning('*');
          }
        }
      }
      res.send({
        success: 'ok',
        result: data
      })
    } else {
      const data = await completedRides.query().where({ driverId: req.body.driverId }).returning('*');
      res.send({
        success: 'ok',
        result: data
      })
    }
  }

}
//get all users 
getAllUsers = async function (req, res) {
  if (req.body.searchKeywords) {
    var data = await Person.query().where({ user_driver: false, user_email: req.body.searchKeywords }).returning('*');
    if (!data.length) {
      data = await Person.query().where({ user_driver: false, user_firstname: req.body.searchKeywords }).returning('*');
      if (!data.length) {
        data = await Person.query().where({ user_driver: false, user_lastname: req.body.searchKeywords }).returning('*');
        if (!data.length) {
          data = await Person.query().where({ user_driver: false, user_phone: Number(req.body.searchKeywords) }).returning('*');
          if (!data.length) {
            data = await Person.query().where({ user_driver: false, id: Number(req.body.searchKeywords) }).returning('*');
          }
        }
      }
    }
    res.send(data)
  } else {
    const fetchdata = await Person.query().where({ user_driver: false }).orderBy('id');
    res.send(fetchdata)
  }
}
//get all drivers 
getAllDrivers = async function (req, res) {
  if (req.body.searchKeywords) {
    var data = await Person.query().where({ user_driver: true, user_email: req.body.searchKeywords }).returning('*');
    if (!data.length) {
      data = await Person.query().where({ user_driver: true, user_firstname: req.body.searchKeywords }).returning('*');
      if (!data.length) {
        data = await Person.query().where({ user_driver: true, user_lastname: req.body.searchKeywords }).returning('*');
        if (!data.length) {
          data = await Person.query().where({ user_driver: true, user_phone: Number(req.body.searchKeywords) }).returning('*');
          if (!data.length) {
            data = await Person.query().where({ user_driver: true, id: Number(req.body.searchKeywords) }).returning('*');
          }
        }
      }
    }
    res.send(data)
  } else {
    const fetchdata = await Person.query().where({ user_driver: true }).orderBy('id');
    res.send(fetchdata)
  }
}
//get all drivers 
getAllTravelHistory = async function (req, res) {
  if (req.body.searchKeywords) {
    var data = await completedRides.query().where({ dropLocation: req.body.searchKeywords }).returning('*');
    if (!data.length) {
      data = await completedRides.query().where({ pickLocation: req.body.searchKeywords }).returning('*');
      if (!data.length) {
        data = await completedRides.query().where({ rideOptionName: req.body.searchKeywords }).returning('*');
        if (!data.length) {
          data = await completedRides.query().where({ paymentReceivedAmount: Number(req.body.searchKeywords), }).returning('*');
          if (!data.length) {
            data = await completedRides.query().where({ driverId: Number(req.body.searchKeywords) }).returning('*');
            if (!data.length) {
              data = await completedRides.query().where({ userId: Number(req.body.searchKeywords) }).returning('*');
              if (!data.length) {
                data = await completedRides.query().where({ estimatedPrice: Number(req.body.searchKeywords) }).returning('*');
              }
            }
          }
        }
      }
    }
    res.send(data)

  } else {
    const fetchdata = await completedRides.query().orderBy('id');
    res.send(fetchdata)
  }
}

// reset password by user email 
resetPassword = async function (req, res) {
  data = await Person.query().where({ user_email: req.body.user_email }).update({ user_password: '1234' }).returning('*');
  var nodemailer = require('nodemailer');
  const gmailEmail = 'miankhurram9797@gmail.com';
  const gmailPassword = 'Khurram119788';
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bidrideofficial@gmail.com',
      pass: 'Khurram119788'
    }
  });
  const email = '';

  var driverMailOptions = {
    from: 'miankhurram9797@gmail.com',
    to: 'miankhurram9797@gmail.com',
    subject: 'New Password Request',
    text: "Password change email",
    html: `<h1>Password change successfully</h1><br>
    <p>
    New Password : 1234<br>
    </p>`
  };
  transporter.sendMail(driverMailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      email = 'Email sent: ' + info.response;
    }
  });
  res.send(
    {
      result: data,
      message: 'password change successfully'
    }
  )
}

// authenticate user by session
getAuthorizeUser = async function (req, res) {
  console.log(req.body);
  if (req.body.user_email) {
    const tokenAvaialbe = await Person.query().findOne({ user_email: req.body.user_email }).returning('*');
    if (tokenAvaialbe) {
      if (req.body.session == tokenAvaialbe.user_utoken) {
        res.send({
          access: true
        })
      } else { res.send({ access: false }) }


    } else { res.send({ access: false }) }
  } else { res.send({ access: false }) }
}

//get all function start
getAllDriversLocation = async function (req, res) {

  console.log('<===========Get all active driver list =================>')
  const fetchdata = await loginUserLocation.query().where({ user_driver: true, active: true });
  if (fetchdata) {
    res.send(fetchdata)
  }
};

//get all function start
getallusers = async function (req, res) {
  console.log(req.query.session);
  if (req.query.session) {
    const tokenAvaialbe = await Person.query().findOne({ user_utoken: req.query.session });
    console.log(tokenAvaialbe)
    if (tokenAvaialbe) {

      var offset = (req.query.page - 1) * req.query.limit;
      console.log('<===========Get all users list =================>')
      const fetchdata = await Person.query().orderBy('user_id').limit(req.query.limit).offset(offset);
      console.log('page no is ', req.query.page)
      console.log('limit of data', req.query.limit)
      console.log('<===========  Response of users =====================>')
      //  res.json(fetchdata)
      console.log(fetchdata)
      console.log('<=========== stringify data =====================>')
      var stringified = JSON.stringify(fetchdata);
      console.log(stringified)
      console.log('<=========== json parse data =====================>')
      var parsedObj = JSON.parse(stringified);
      console.log(parsedObj)
      res.render("index", { parsedObj });
      console.log(res.render);

    }
    else { res.json({ "you have to login first token empty": "Null Token" }) }
  } else {
    res.json({ "pass your header token": " Token not found" });
  }
};

//postuser start from here
postuserdata = async function (req, res) {
  console.log('<===========data of user  =================>')
  console.log(req.body);
  const checkemail = await Person.query().findOne({ user_email: req.body.user_email });
  if (checkemail) {
    console.log(checkemail);
    res.json({ error: "This user already exist" })
  }
  else {
    const fetchdata = await Person.query().insert(req.body).returning('*');
    // const locationEntryData  = await loginUserLocation.query().insert({ user_email: fetchdata.user_email , user_id:fetchdata.id}).returning('*');
    const updateUserActive = await Person.query().where({ user_email: req.body.user_email }).update({ active: true }).returning('*');
    const getLocationByUserId = await loginUserLocation.query().insert({
      user_email: fetchdata.user_email,
      user_id: fetchdata.id,
      user_driver: fetchdata.user_driver, active: true
    });
    console.log('<===========  Response of users =====================>')
    if (fetchdata) {
      res.send({
        "user email": fetchdata.user_email,
        message: 'User Created Successfully',
        result: {
          address: "aaaa",
          city: "Makkah",
          cityId: 37420,
          companyCount: 10,
          country: "Pakistan",
          countryCode: "+966",
          countryId: 191,
          dob: "",
          email: fetchdata.user_email,
          firstName: fetchdata.user_firstname,
          isActive: true,
          active: updateUserActive == 0 ? false : true,
          isResetPassword: "N",
          lastName: fetchdata.user_lastname,
          middleName: "Anwer",
          phone: fetchdata.user_phone,
          primaryFullName: "",
          role: "USER",
          driver: fetchdata.user_driver == 0 ? false : true,
          user_rideHistory: fetchdata.user_rideHistory == 0 ? false : true,
          secondaryFirstName: "",
          secondaryFullName: "",
          secondaryLastName: fetchdata.user_lastname,
          secondaryMiddleName: "Anwer",
          session: fetchdata.user_utoken,
          password: fetchdata.user_password,
          state: "Makkah",
          stateId: 3155,
          userDetailId: 2,
          userId: fetchdata.id,
          userName: fetchdata.user_email,
          zipCode: "43032"
        },
        location: getLocationByUserId
      });
    }
  }
}
//update user start fromhere
updateuserdata = async function (req, res) {
  console.log(req.headers.token);
  if (req.headers.token) {
    const tokenAvaialbe = await Person.query().findOne({ user_utoken: req.headers.token });
    console.log(tokenAvaialbe)
    if (tokenAvaialbe) {

      console.log('<===========data of user to be updated  =================>')
      console.log(req.body);

      const fetchdata = await Person.query().where({ user_id: req.params.user_id }).update(req.body).returning('*');
      console.log('<===========  Response of users =====================>')

      res.json(fetchdata);

    }
    else { res.json({ "you have to login first token empty": "Null Token" }) }
  } else {
    res.json({ "pass your header token": " Token not found" });
  }

}
//updatedata start fromhere
updatedata = async function (req, res) {

  console.log(req.query.id);

  console.log('<===========data of user to be updated  =================>')
  console.log(req.query.value);
  console.log("req body is comming");
  console.log(req.body);

  const fetchdata = await Person.query().where({ user_id: req.query.id }).update(req.body).returning('*');
  console.log('<===========  Response of users =====================>')

  res.json(fetchdata);

}

//delete user by id start from here          
deleteuserbyid = async function (req, res) {
  console.log(req.headers.token);
  if (req.headers.token) {
    const tokenAvaialbe = await Person.query().findOne({ user_utoken: req.headers.token });
    console.log(tokenAvaialbe)
    if (tokenAvaialbe) {

      console.log('<===========id of user to be deleted  =================>')
      console.log(req.params.user_id);
      const fetchdata = await Person.query().where({ user_id: req.params.user_id }).del();
      console.log('<===========  Response of users =====================>')
      res.json({ "User deleted with ID": req.params.user_id });


    }
    else { res.json({ "you have to login first token empty": "Null Token" }) }
  } else {
    res.json({ "pass your header token": " Token not found" });
  }

}

//deleteuser start from here          
deleteuser = async function (req, res) {

  console.log('<===========id of user to be deleted  =================>')
  console.log("query request");
  console.log(req.query.user_id);
  const fetchdata = await Person.query().where({ user_id: req.query.user_id }).del();
  console.log('<===========  Response of users =====================>');
  console.log(fetchdata);
  res.send({ "User deleted with ID": req.query.user_id });

}

//search user start from here
searchusers = async function (req, res) {
  console.log('<===========id of user to be searched  =================>')



  if (req.query.user_id) {
    console.log('user_id', req.query.user_id);
    const fetchdata = await Person.query().where({ user_id: req.query.user_id });
    console.log('<===========  Response of users =====================>')
    res.json(fetchdata);
  }
  if (req.query.user_email) {
    console.log('user_email', req.query.user_email);
    const fetchdata = await Person.query().where({ user_email: req.query.user_email });
    console.log('<===========  Response of users =====================>')
    res.json(fetchdata);
  }
  if (req.query.user_name) {
    console.log('user_name', req.query.user_name);
    const fetchdata = await Person.query().where({ user_name: req.query.user_name });
    console.log('<===========  Response of users =====================>')
    res.json(fetchdata);
  }
  if (req.query.user_id, req.query.user_name) {
    console.log('user_id', req.query.user_id);
    console.log('user_name', req.query.user_name);
    const fetchdata = await Person.query().where({ user_name: req.query.user_name, user_id: req.query.user_id });
    console.log('<===========  Response of users =====================>')

    res.json(fetchdata);
  }
  if (req.query.user_name, req.query.user_email) {
    console.log('user_name', req.query.user_name);
    console.log('user_email', req.query.user_email);
    const fetchdata = await Person.query().where({ user_name: req.query.user_name, user_email: req.query.user_email });
    console.log('<===========  Response of users =====================>')

    res.json(fetchdata);
  }
  if (req.query.user_id, req.query.user_name, req.query.user_email) {
    console.log('user_id', req.query.user_id);
    console.log('user_name', req.query.user_name);
    console.log('user_email', req.query.user_email);
    const fetchdata = await Person.query().where({ user_name: req.query.user_name, user_id: req.query.user_id, user_email: req.query.user_email });
    console.log('<===========  Response of users =====================>')

    res.json(fetchdata);
  }

}





module.exports = {
  getallusers,
  allusers,
  postuserdata,
  updateuserdata,
  updatedata,
  deleteuserbyid,
  deleteuser,
  searchusers,
  loginusers,
  logoutusers,
  homefunction,
  getAuthorizeUser,
  getAllDriversLocation,
  SaveUserLocation,
  calculateDistance,
  saveRideRequestForBidding,
  cancelRideRequestForBidding,
  getRideRequestForBiddings,
  savePriceAgainstBidFunction,
  getBiddingsByDrivers,
  manageSelectedRide,
  getUserByUserId,
  getLocationByUserId,
  completeUserRide,
  getTravelHistoryByUserId,
  updateUser,
  getManageRideById,
  getAllUsers,
  getAllDrivers,
  getAllTravelHistory,
  resetPassword,
  logOutUser
}


