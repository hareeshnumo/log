const winston = require('winston');
require('winston-daily-rotate-file');
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
// The combine() method merges multiple formats into one
const format = winston.format.combine(
  // timestamp() method outputs a datatime value that corresponds to the time that the message was emitted.
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  // winston.format.colorize({ all: true }),
  // printf() defines a custom structure for the message
  winston.format.printf(
    (info) => `${info.timestamp}: ${info.level}: ${info.message}`,
  ),
  // new winston.transports.DailyRotateFile({
  //   filename: 'combined-%DATE%.log',
  //   datePattern: 'YYYY-MM-DD',
  //   maxFiles: '14d',
  // })
)

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),
  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new winston.transports.File({ filename: 'logs/all.log' }),
]

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: 'http',
  levels,
  format,
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exception.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: './logs/rejections.log' }),
  ],
  exitOnError: false
})

module.exports = logger