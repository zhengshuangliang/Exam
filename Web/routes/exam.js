/**
 * Created by c-zhengs on 11/14/2014.
 */
'use strict';
var mysql = require('mysql'),
    config = require('../config/db'),
    winston = require('winston');

exports.index = function(request, response) {
        response.render('exam',
            {
                title: 'this is a title?'
            });

};

exports.getExamData = function(request, response) {
    function getExam(callback) {
        var examId = request.params.examId,
            defaultLogger,
            query,
            connection = mysql.createConnection({
                host: config.AuthDBHost,
                user: config.AuthDBUser,
                password: config.AuthDBPass,
                database: config.AuthDBName,
                multipleStatements: true // this configuration will enable return multiple select result
            });
        connection.connect(function (err) {
            if (err) {
                callback(err);
            }
            else {
                //myParams = connection.escape(request.params.staffID); // required
                query = 'SELECT * FROM exercises.exam where id=?;'
                + 'select * from exercises.examitem where examid=?;'
                + 'select ep.* from exercises.examoption ep left join exercises.examitem ei on ei.ID=ep.examitemid where ei.examid=? order by examitemid asc, `index` asc';

                defaultLogger = winston.loggers.get('info');
                defaultLogger.info(query);

                connection.query(query,[examId,examId,examId], function (err, results) {
                    connection.end();
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, results);
                    }
                });
            }
        });
    }


    getExam(function (err, result) {
        var errorString,
            returnResponse,
            defaultLogger,
            error;

        if (err) {
            // <SampleMySqlError>
            // { [Error: ER_BAD_FIELD_ERROR: Unknown column 'undefined' in 'field list']
            // code: 'ER_BAD_FIELD_ERROR', index: 0 }
            // </SampleMySqlError>
            // Remove ";"'s from error in order not to lose parts of error.
            errorString = String(err).replace(/:/g, '');
            returnResponse = { errorString: errorString };

            defaultLogger = winston.loggers.get('default');

            // Create a new Error object to capture stacktrace.
            error = new Error(err);
            defaultLogger.error(errorString, { stackTrace: error.stack });

            response.send(JSON.stringify(returnResponse));
        }
        else {
            if(result[0].length==0){
                response.send("没有找到本试题");
            }
           else{
                response.send('{"exam":'+JSON.stringify(result[0])+',"examitem":'+JSON.stringify(result[1])+',"examoption":'+JSON.stringify(result[2])+'}');
            }
        }
    });

};