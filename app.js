require('module-alias/register');
const createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const globalVar = require('./src/utils/globalVariable');
var cors = require('cors');
var indexRouter = require('./src/components/index');
var usersRouter = require('./routes/users');

var app = express();

var bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.options('*', cors()) // include before other routes
// app.use(ignoreFavicon);
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Content-Type,Authorization', 'Access-Control-Allow-Origin', 'Authenticate', 'username', 'password');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var whitelist = ['*'];
const corsOptions = {
    origin: function (origin, callback) {

        if (whitelist.indexOf(origin) !== -1) {
            //console.log('origin->' + origin)
            callback(null, true)
        } else {
            //console.log('origin->' + origin)
            callback(null, true)
            //callback(new Error('not allow not defined origin: '+origin),false)
        }
    },

    allowedHeaders: 'Content-Type,Authorization,Access-Control-Allow-Origin,Authenticate,username,password',
    preflightContinue: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204,
};

app.use(cors(corsOptions));

app.use(globalVar.getEndPoint(), indexRouter);
app.use(globalVar.getPath(), indexRouter);
app.use('/users', usersRouter);


function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
}

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta');

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.log(`App is starting`);

module.exports = app;
