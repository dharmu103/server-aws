var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express()

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())


app.get('/regis', function (req, res) {
    res.send('<h3>I am OKR register backend! Running fine........</h3>');
});
// app.use(express.static('public'));
 app.use('/uploads', express.static('uploads'));

require('./routes/index')(app);


app.set('port', process.env.PORT || 9001);
var server = app.listen(app.get('port'), function () {
    console.log('For OKR_BACKEND_SERVER, Express server listening on port ' + server.address().port);
});


// 404 Error
app.use(function (req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


// Custom Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        err: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error',
        },
    });
});

// const mysql =require('mysql');

// const con =  mysql.createConnection({
//     host:'localhost',
//     port: '3307',
//     user:'root',
//     password: ''
// }) 

// con.connect((err)=>{
//     if(err){
//         console.log(err);
//     }
// console.log("Running");
// });

// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host     : 'localhost',
//   port:'3307',
//   user     : 'root',
//   password : '',
//   database : 'db',
// });

// pool.getConnection((err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("Running");
   
// })