const pool = require('pg').Pool;
//connect to database
const db = new pool({
    user: 'Sammura',      // Your O/S user name
    host: 'localhost',
    database: 'Sammura',  // ... and again.
    password: '1234567890',      // The one you gave yourself above
    port: 5432,
  });

  //get all the customers with id 32
  db.query('select * from customers where id = 32', (err, queryResult)=>{
    if(err){
        throw err;
    }
    console.log(queryResult);
  });