/**
* MODULE DEPENDENCIES
* -------------------------------------------------------------------------------------------------
* include any modules you will use through out the file
**/
winston = require('winston');

/**
* Logging
* -------------------------------------------------------------------------------------------------
* 
**/

// Server exceptions
winston.loggers.add('default', {
    console: {
        level: 'info',
        colorize: 'true',
        handleExceptions: true,
        timestamp: 'true'
    },
    file: {
        level: 'error',
        filename: './logs/project_server_exceptions.log',
        timestamp: 'true',
        handleExceptions: true,
        maxsize: 10485760,
        maxFiles: 10
    }
});

// ALL, info and exceptions from server
winston.loggers.add('info', {
    console: {
        level: 'info',
        colorize: 'true',
        handleExceptions: true,
        timestamp: 'true'
    },
    file: {
        level: 'info',
        filename: './logs/project_server_verbose.log',
        timestamp: 'true',
        handleExceptions: true,
        maxsize: 10485760,
        maxFiles: 10
    }
});

// Client exceptions
winston.loggers.add('client', {
    console: {
        level: 'info',
        colorize: 'true',
        handleExceptions: true,
        timestamp: 'true'
    },
    file: {
        level: 'error',
        filename: './logs/project_client_exceptions.log',
        timestamp: 'true',
        handleExceptions: true,
        maxsize: 10485760,
        maxFiles: 10
    }
});