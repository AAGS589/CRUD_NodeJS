const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// importando rutas
const customerRoutes = require('./routes/customer');

// setting
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: '34.229.155.177',
    user: 'ubuntu',
    password: 'password',
    port: 3306,
    database: 'crudnodejs'
}, 'single' ))
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', customerRoutes);

// statics files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () =>{
    console.log('servicio lanzado en: http://localhost:3000/');
});