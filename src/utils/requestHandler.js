const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));
  const logger = require("../utils/logger");
const getRequestHandler= async (url)=>{
    logger.info(`get request handler ${url}`);
    try {
      const response = await fetch(url,
          {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          });
      if (!response.ok) {
        const responseObj=await response.json();
        logger.error(`responded with error ${responseObj}`);
        return responseObj;
      }
      const responseData= await response.json();
      return responseData;
    } catch (e) {
      logger.error(`responded with error ${e}`);
      return null;
    }
  };


  const postRequestHandler = async (postUrl, postData) => {
    logger.info(`post request handler ${postUrl}, with data ${postData}`);
    try {
      const postResp = await fetch(postUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          });
          if (!postResp.ok) {
            const responseObj=await response.json();
            logger.error(`responded with error ${postResp}`);
            return postResp;
          }
      
    } catch (er) {
      logger.error(`responded with error ${e}`);
      return null;
    }
  };

module.exports={getRequestHandler, postRequestHandler}