window.onerror = function (message, url, lineNumber) {
    'use strict';
    var log = {
        message: message,
        lineNumber: lineNumber,
        url: url
    };

    $.ajax({
        type: 'POST',
        url: '/errorReporter',
        data: JSON.stringify(log),
        dataType: 'json',
        cache: false,
        contentType: 'application/json; charset=utf-8'
    });

    return true;
};

window.log = function (error, requestResponseText, requestStatusCode, requestStatusText, status) {
    'use strict';
    var errorLog;
    if (error) {
        //if (this.console && this.console.log) {
        //    // If we have browser console support (e.g. not in IE8),
        //    // log to browser console.
        //    this.console.log(error);
        //}

        // Always inform the server we have a client error, so
        // it can be logged appropriately.
        if (error instanceof Error) {
            if (error.stack) {
                if (requestResponseText && requestStatusCode && requestStatusText && status) {
                    errorLog = {
                        message: error.message,
                        stackTrace: error.stack,
                        requestResponseText: requestResponseText,
                        requestStatusCode: requestStatusCode,
                        requestStatusText: requestStatusText,
                        status: status
                    };
                }
                else {
                    errorLog = {
                        message: error.message,
                        stackTrace: error.stack
                    };
                }
            }
            else {
                errorLog = {
                    message: error.message
                };
            }

            $.ajax({
                type: 'POST',
                url: '/errorReporter',
                data: JSON.stringify(errorLog),
                dataType: 'json',
                cache: false,
                contentType: 'application/json; charset=utf-8'
            });
        }
    }
};