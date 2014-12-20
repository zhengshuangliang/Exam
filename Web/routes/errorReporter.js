'use strict';
var winston = require('winston');

exports.logError = function (request, response) {
    var logger;

    if (request.body.message) {
        logger = winston.loggers.get('client');

        if (request.body.stackTrace) {
            if (request.body.requestResponseText) {
                logger.error(request.body.message,
                {
                    stackTrace: request.body.stackTrace,
                    requestResponseText: request.body.requestResponseText,
                    requestStatusCode: request.body.requestStatusCode,
                    requestStatusText: request.body.requestStatusText,
                    status: request.body.status
                });
            }
            else {
                logger.error(request.body.message,
                {
                    stackTrace: request.body.stackTrace
                });
            }
        }
        else if (request.body.url && request.body.lineNumber) {
            logger.error(request.body.message,
            {
                lineNumber: request.body.lineNumber,
                url: request.body.url
            });
        }
        else {
            logger.error(request.body.message);
        }
    }
    else {
        response.send('Error: "Message" is required');
    }
};