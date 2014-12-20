'use strict';
var mysql = require('mysql'),
    config = require('./db'),
    winston = require('winston'),
    passport = require('passport'),
    NoPasswordStrategy = require('passport-nopassword').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy,
    utils = require('../routes/utils/utils');

module.exports = function (passport) {
    //   Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.
    passport.serializeUser(function (user, done) {
        if (user && user.StaffID) {
            done(null, user.StaffID);
        }
    });

    passport.deserializeUser(function (id, done) {
        findById(id, function (err, user) {
            done(err, user);
        });
    });

    //   Use the NoPasswordStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, just an email and _no_ password), and invoke a callback
    //   with a user object.
    passport.use(new NoPasswordStrategy(
      function (email, done) {
          // Find the user by email.  If there is no user with the given
          // email, set the user to `false` to indicate failure and set a flash message.  
          // Otherwise, return the authenticated `user`.
          email = email.toLowerCase().trim();

          // Domain name is optional here, so append 
          // if not found.  It is not optional from 
          // the data layer.
          if (email.indexOf("@igt.com") === -1) {
              email += "@igt.com";
          }

          findByEmail(email, function (err, user) {
              if (err) {
                  return done(err);
              }
              if (!user || !user.Authentication || user.Authentication !== 1) {
                  return done(null, false, { message: 'Unknown user with email: ' + email });
              }
              //if (!user.Authentication || user.Authentication !== 1) {
              //    return done(null, false, { message: 'Incorrect email address ' + email });
              //}
              return done(null, user);
          });
      }
    ));

    //   Remember Me cookie strategy
    //   This strategy consumes a remember me token, supplying the user the
    //   token was originally issued to.  The token is single-use, so a new
    //   token is then issued to replace it.
    passport.use(new RememberMeStrategy(
      function (token, done) {
          consumeRememberMeToken(token, function (err, uid) {
              if (err) {
                  return done(err);
              }
              if (!uid) {
                  return done(null, false);
              }

              findById(uid, function (err, user) {
                  if (err) {
                      return done(err);
                  }

                  if (!user) {
                      return done(null, false);
                  }

                  return done(null, user);
              });
          });
      },
      issueToken
    ));

    function issueToken(user, done) {
        if (user && user.StaffID) {

            var token = user.StaffID + '|' + utils.randomString(128);
            saveRememberMeToken(token, user.StaffID, function (err) {
                if (err) { return done(err); }
                return done(null, token);
            });
        }
    }

    function saveRememberMeToken(token, uid, callback) {
        var myParams,
            defaultLogger,
            query,
            connection = mysql.createConnection({
                host: config.AuthDBHost,
                user: config.AuthDBUser,
                password: config.AuthDBPass,
                database: config.AuthDBName
            });

        connection.connect(function (err) {
            if (err) {
                callback(err);
            }
            else {
                myParams = connection.escape(uid)
                         + ', ' + connection.escape(token);

                query = 'call Proc_AddStaffToken(' + myParams + ')';

                defaultLogger = winston.loggers.get('info');
                defaultLogger.info(query);

                connection.query(query, function (err, rows) {
                    connection.end();
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback();
                    }
                });
            }
        });
    }

    function getStaffIDForToken(token, callback) {
        var myParams,
            defaultLogger,
            query,
            connection = mysql.createConnection({
                host: config.AuthDBHost,
                user: config.AuthDBUser,
                password: config.AuthDBPass,
                database: config.AuthDBName
            });

        connection.connect(function (err) {
            if (err) {
                callback(err);
            }
            else {
                myParams = connection.escape(token);

                query = 'call Proc_GetStaffIDForToken(' + myParams + ')';

                defaultLogger = winston.loggers.get('info');
                defaultLogger.info(query);

                connection.query(query, function (err, rows) {
                    connection.end();

                    if (err) {
                        return callback(err);
                    }
                    else {
                        if (rows[0][0] && rows[0][0].StaffID)
                        {
                            callback(null, rows[0][0].StaffID);
                        }
                        else {
                            callback();
                        }
                    }
                });
            }
        });
    }

    function deleteStaffToken(token, staffID, callback) {
        var myParams,
            defaultLogger,
            query,
            connection = mysql.createConnection({
                host: config.AuthDBHost,
                user: config.AuthDBUser,
                password: config.AuthDBPass,
                database: config.AuthDBName
            });

        connection.connect(function (err) {
            if (err) {
                callback(err);
            }
            else {
                myParams = connection.escape(staffID)
                         + ', ' + connection.escape(token);

                query = 'call Proc_DeleteStaffToken(' + myParams + ')';

                defaultLogger = winston.loggers.get('info');
                defaultLogger.info(query);

                connection.query(query, function (err, rows) {
                    connection.end();
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback();
                    }
                });
            }
        });
    }

    function consumeRememberMeToken(token, callback) {
        getStaffIDForToken(token, function (err, staffID) {
            if (err) {
                callback(err);
            }
            else {
                if (staffID) {
                    deleteStaffToken(token, staffID, function (err) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(null, staffID);
                        }
                    });
                }
                else {
                    callback();
                }
            }
        });
    }

    function findById(id, callback) {
        var myParams,
            defaultLogger,
            query,
            connection = mysql.createConnection({
                host: config.AuthDBHost,
                user: config.AuthDBUser,
                password: config.AuthDBPass,
                database: config.AuthDBName
            });

        connection.connect(function (err) {
            if (err) {
                callback(err);
            }
            else {
                myParams = connection.escape(id);

                query = 'call Proc_GetStaffByID(' + myParams + ')';

                defaultLogger = winston.loggers.get('info');
                defaultLogger.info(query);
                
                connection.query(query, function (err, rows) {
                    connection.end();
                    if (err) {
                        callback(err);
                        return;
                    }
                    else {
                        callback(null, rows[0][0]);
                    }
                });
            }
        });
    }

    function findByEmail(email, callback) {
        var myParams,
            defaultLogger,
            query,
            connection = mysql.createConnection({
                host: config.AuthDBHost,
                user: config.AuthDBUser,
                password: config.AuthDBPass,
                database: config.AuthDBName
            });

        connection.connect(function (err) {
            if (err) {
                callback(err);
            }
            else {
                myParams = connection.escape(email);

                query = 'call Proc_UserLoginCheck(' + myParams + ')';

                defaultLogger = winston.loggers.get('info');
                defaultLogger.info(query);

                connection.query(query, function (err, rows) {
                    connection.end();
                    if (err) {
                        callback(err);
                        return;
                    }
                    else {
                        callback(null, rows[0][0]);
                    }
                });
            }
        });
    }
};