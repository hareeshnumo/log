var express = require('express');
var router = express.Router();
const {getRequestHandler}=require('../utils/requestHandler')
const morganMiddleware = require("../middlewares/morganlog");
const logger = require("../utils/logger");

router.get('/', async function(req, res, next) {
  // logger.info('Checking the API status: Everything is OK');
  // const url='https://devfusion.numocity.in/npmasset/api/qrChargeCpTariff?numotype=ocpp&connectorId=1&cpId=hariTest';
  // const response=await getRequestHandler(url)
  res.set('Content-Type', 'a/plain');
  res.body = { message: 'Hello, world!' };
  res.send(res.body);
});

module.exports = router;
