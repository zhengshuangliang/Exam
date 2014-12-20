/**
 * Created by c-zhengs on 9/28/2014.
 */


/**
 * MODULE DEPENDENCIES
 * -------------------------------------------------------------------------------------------------
 * include any modules you will use through out the file
 **/
var express = require('express')                                    // Express web framework
    , http = require('http')                                          // HTTP server & client
    , path = require('path')                                          // Utility for handling file paths.
    , logger = require('./routes/utils/logger')                       // logging
    , flash = require('connect-flash')                                // Flash message middleware
    , config = require('./config/db')                                 // database configurations
    , passport = require('passport')                                  // authentication
    , RememberMeStrategy = require('passport-remember-me').Strategy   // authentication
    , mysql = require('mysql')
    , mssql = require('mssql')
    , myConnection = require('express-myconnection');

// bootstrap passport config
require('./config/passport')(passport);


/**
 * EXPRESS
 * -------------------------------------------------------------------------------------------------
 * configure expressjs framework
 **/
var app = module.exports = express();

app.configure(function(){
    app.set('port', process.env.PORT || 4000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser('J3z%NAAATlS!Gs3pyXSk'));
    app.use(express.session({
        secret: '4^u%*w33RUlJP^J0%*qI',
        cookie: { path: '/', httpOnly: true, maxAge: 3600000 }          // maxAge is in milliseconds (1 hour)
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Use connect-flash middleware.  This will add a `req.flash()` function to
    // all requests, matching the functionality offered in Express 2.x.
    app.use(flash());

    app.use(passport.authenticate('remember-me'));
    app.use(function (req, res, next) {
        var err = req.flash('error'),
            warning = req.flash('warning'),
            info = req.flash('info');

        res.locals.error = '';
        res.locals.info = '';
        res.locals.warning = '';

        if (err) {
            res.locals.error = err;
        }

        if (info) {
            res.locals.info = info;
        }

        if (warning) {
            res.locals.warning = warning;
        }

        next();
    });
    app.use(express.methodOverride());

    // It has to be registered somewhere before app.router
    app.use(myConnection(mysql, {
        host: config.AuthDBHost,
        user: config.AuthDBUser,
        password: config.AuthDBPass,
        port: config.AuthDBPort,
        database: config.AuthDBName
    }, 'single'));

    app.use(app.router);

});



app.configure('development', function(){
    app.use(express.errorHandler());
});




/**
 * ROUTING
 * -------------------------------------------------------------------------------------------------
 * This is the main entry point.  All the routes are defined in ./routes/main
 **/
var routes = require('./routes/main');




/**
 * RUN
 * -------------------------------------------------------------------------------------------------
 * this starts up the server on the given port
 **/
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
