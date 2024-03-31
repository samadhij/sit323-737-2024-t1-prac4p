// Importing required modules

// Express module for handling HTTP requests
const express= require("express");
const res = require("express/lib/response");
// FS for file system operations
const fs = require('fs');
// Winston for logging
const winston = require('winston');

// Creating an Express application instance
const app= express();

//Creating a logger instance using winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-microservice' },
    transports: [

      //This will write log messages to the console
      new winston.transports.Console({
        format: winston.format.simple(),
        }),

      // - This will write all logs with importance level of `error` or less to `error.log`
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

      // - This will write all logs with importance level of `info` or less to `combined.log`
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });
  

// Addition function
const add= (num1,num2) => {
    return num1+num2;
}

// Subtraction function
const sub= (num1,num2) => {
  return num1-num2;
}

// Multiplication function
const multiply= (num1,num2) => {
  return num1*num2;
}

// Division function
const divide= (num1,num2) => {
  return num1/num2;
}

// Addition endpoint
app.get("/add", (req,res)=>{
    try{
    const num1= parseFloat(req.query.num1);
    const num2=parseFloat(req.query.num2);
    if(isNaN(num1)) {
        logger.error("num1 is incorrectly defined");
        throw new Error("num1 incorrectly defined");
    }
    if(isNaN(num2)) {
        logger.error("num2 is incorrectly defined");
        throw new Error("num2 incorrectly defined");
    }

    // Logging the request
    logger.log({
      level: 'info',
      message: `New addition operation requested: ${num1} + ${num2}`,
    });
    
    logger.info('Parameters '+num1+' and '+num2+' received for addition');
    const result = add(num1,num2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});


//Subtraction endpoint
app.get("/subtract", (req, res) => {
  try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (isNaN(num1)) {
          logger.error("num1 is incorrectly defined");
          throw new Error("num1 incorrectly defined");
      }
      if (isNaN(num2)) {
          logger.error("num2 is incorrectly defined");
          throw new Error("num2 incorrectly defined");
      }

      // Logging the request
    logger.log({
      level: 'info',
      message: `New subtraction operation requested: ${num1} - ${num2}`,
    });
      
      logger.info('Parameters ' + num1 + ' and ' + num2 + ' received for subtraction');
      const result = sub(num1,num2);
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      console.error(error);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

// Multiplication endpoint
app.get("/multiply", (req, res) => {
  try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (isNaN(num1)) {
          logger.error("num1 is incorrectly defined");
          throw new Error("num1 incorrectly defined");
      }
      if (isNaN(num2)) {
          logger.error("num2 is incorrectly defined");
          throw new Error("num2 incorrectly defined");
      }

      // Logging the request
    logger.log({
      level: 'info',
      message: `New multiplication operation requested: ${num1} * ${num2}`,
    });
      
      logger.info('Parameters ' + num1 + ' and ' + num2 + ' received for multiplication');
      const result = multiply(num1,num2);
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      console.error(error);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

// Division endpoint
app.get("/divide", (req, res) => {
  try {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      if (isNaN(num1)) {
          logger.error("num1 is incorrectly defined");
          throw new Error("num1 incorrectly defined");
      }
      if (isNaN(num2)) {
          logger.error("num2 is incorrectly defined");
          throw new Error("num2 incorrectly defined");
      }
      if (num2 === 0) {
          logger.error("cannot divide by zero");
          throw new Error("division by zero");
      }

      // Logging the request
    logger.log({
      level: 'info',
      message: `New division operation requested: ${num1} / ${num2}`,
    });
      
      logger.info('Parameters ' + num1 + ' and ' + num2 + ' received for division');
      const result = divide(num1,num2);
      res.status(200).json({ statuscode: 200, data: result });
  } catch(error) {
      console.error(error);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

const port=3040;
app.listen(port,()=> {
    console.log("Calculator microservice is running on port "+port);
})