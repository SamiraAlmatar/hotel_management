const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//sql library
const pool = require('pg').Pool;
//connect to database
const db = new pool({
  user: 'Sammura',      // Your O/S user name
  host: 'localhost',
  database: 'Sammura',  // ... and again.
  password: '1234567890',      // The one you gave yourself above
  port: 5432,
});

//home page
app.get('/', (req, res)=>{
    res.send('Home Page');
});

//get all the customer from the db
app.get('/customers', (req, res) =>{
    const qur = 'select name, email, phone FROM customers';
    db.query(qur, (err, result) =>{
        if(err){
            throw err;
        }
        result.rows.forEach(row => {
            console.log(`${row.name} ${row.email} ${row.phone}`);
        });
        res.status(200).json({
            customers : result.rows
        });
    });
    
});

//get customer by id
app.get('/customer/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    db.query('select name, phone, email from customers where id =$1', [id], (err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json({
            customer : result.rows[0]
        });
    });
});
app.listen(3000, () =>{
    console.log(`server run on 3000`);
});