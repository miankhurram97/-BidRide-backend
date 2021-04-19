const knex = require('knex')({
    client:'pg',
    connection:{
        
        user: 'postgres',
        host: 'localhost',
        database: 'mydata',
        password: '12345',
        port: 5432,
    
    }
    });
    
    module.exports=knex;