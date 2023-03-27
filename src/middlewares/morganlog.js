const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
    // Use the http severity
    write: (message) => logger.http(message),
};

morgan.token('request-headers', (req, res) => {
  return JSON.stringify(req.headers);
});

morgan.token('response-headers', (req, res) => {
  return JSON.stringify(res._header);
});

morgan.token('reqBody', (req, res) => {
  return JSON.stringify(req.body);
});

morgan.token('resBody', (req, res) => {
  return JSON.stringify(res.body);
});

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
  };
  
  const morganMiddleware = morgan(
    ':method :url req_headers :request-headers :reqBody (:user-agent) status:status res_headers:response-headers :resBody (:response-time ms) ',
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => logger.http(message.trim()),
      },
    }
  );
  
  module.exports = morganMiddleware;