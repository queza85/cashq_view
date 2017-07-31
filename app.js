const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// const fileUpload = require('express-fileupload');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
// app.use(fileUpload());

// Require our routes into the application.
require('./app/routes')(app);

//view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
module.exports = app;
