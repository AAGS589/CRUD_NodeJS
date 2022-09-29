const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors')

const app = express();

// importando rutas
const customerRoutes = require('./routes/customer');

// setting
app.set('port', process.env.PORT || 3000);


// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: '100.25.213.248',
    user: 'ubuntu',
    password: 'password',
    port: 3306,
    database: 'crudnodejs'
}, 'single' ))
app.use(express.urlencoded({extended: false}))
app.use(cors())
// routes
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})

app.use('/', customerRoutes);

// statics files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () =>{
    console.log('server on port 3000');
});