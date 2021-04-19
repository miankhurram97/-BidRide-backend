const express = require('express')
const app = express()

 const bodyParser = require('body-parser')


 app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,x-access-token,session');
  res.header( 'Access-Control-Allow-Methods','  POST,PUT, GET,OPTIONS,DELETE');
  res.header("Content-Type: application/json;charset=UTF-8");
  next();
  
});

app.get('/home',function(req,res){

  res.send("System Ready");

});

// //with objection model
// const { Person } = require('../models/usersModel')

// let Ajv = require('ajv')
// let ajv = Ajv({ allErrors:true, removeAdditional:'all' })
// let userSchema = require('../new-userschema')
// ajv.addSchema(userSchema, 'new-user')

// function errorResponse(schemaErrors) {
//   let errors = schemaErrors.map((error) => {
//     return {
//       path: error.dataPath,
//       message: error.message
//     }
//   })
//   return {
//     status: 'failed',
//     errors: errors
//   }
// }
// let validateSchema = (schemaName) => {
//   return (req, res, next) => {
//     let valid = ajv.validate(schemaName, req.body)
//     if (!valid) {
//       return res.send(errorResponse(ajv.errors))
//     }
//     next()
//   }
// }


// app.get('/users', async (req, res) => {
//   const fetchdata = await Person.query().orderBy('user_id');
//   res.json(fetchdata)
// })

// //get the specific user
// app.get('/users/:user_id',async(req,res)=>{
// req.check('user_id','Invalid email address').isInteger();

//   const fetchdata = await Person.query().where({user_id:req.params.user_id});
//     res.json(fetchdata);

// });

// //delete the specific user
// app.delete('/users/:user_id',async(req,res)=>{

//   const fetchdata = await Person.query().where({user_id:req.params.user_id}).del() ;
//       res.send(`User deleted with ID: ${req.params.user_id}`);
    
//     // res.send({"user deleted":""});
   
//   });


// app.post('/postuser',validateSchema('new-user'),async(req,res)=>{

//   console.log(req.body);


//   const fetchdata= await Person.query().insert(req.body).returning('*');    
//   res.json(fetchdata);
 
//   });


//   //update the data
//   app.put('/updateuser/:user_id', async(req,res)=>{
  
//     console.log(req.body);
//     const fetchdata = await Person.query().where({user_id: req.params.user_id}).update(req.body).returning('*');
//     res.json(fetchdata);
   
// });


//without objection model
// const db = require('../databases/dbindex');


// app.get('/',function(req,res){

//     res.send("System Ready");

// });

// app.get('/users',function(req,res){

//   db.select().from('test_data').orderBy('user_id').then(function(data){

//     res.send(data);

//   });

// });

// app.post('/postuser',function(req,res){

//   console.log(req.body);

//   //insert data into database
//   db.insert(req.body).returning('*').into('test_data').then(function(data){
//     res.send(data);
//   });


// });


//   //update the data
//   app.put('/updateuser/:user_id',function(req,res){
  
//     console.log(req.body);
//     db('test_data').where({user_id: req.params.user_id}).update(req.body).returning('*').then(function(body){
//     res.send(body);
//     });

// });

// //update the single entery
// app.patch('/updateuser/:user_id',function(req,res){
  
//   console.log(req.body);
//   db('test_data').where({user_id: req.params.user_id}).update(req.body).returning('*').then(function(body){
//   res.send(body);
//   });

// });


// //delete the specific user
// app.delete('/users/:user_id',function(req,res){

//   db('test_data').where({user_id:req.params.user_id}).del().then(function(){

//      res.send(`User deleted with ID: ${req.params.user_id}`);
    
//     console.log(req.send);
//     // res.send({"user deleted":""});
   
//   });

// });

// //get the specific user
// app.get('/users/:user_id',function(req,res){

//   db('test_data').where({user_id:req.params.user_id}).select().then(function(data){
//     res.send(data);
    
//   });

// });




// const db = require('../queries')


// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });

//   router.post('/add',  (req, res) => {
//     console.log(req.body);
//     return;
// });

// router.get('/users', db.getUsers)
// router.get('/users/:user_id', db.getUserById)
// router.post('/users', db.createUser)
// router.put('/users/:user_id', db.updateUser)
// router.delete('/users/:user_id', db.deleteUser)

module.exports = app;
