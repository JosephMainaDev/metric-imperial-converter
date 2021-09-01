'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert')
  .get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // both number and unit are invalid
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      res.send('invalid number and unit');
    }

    // number is invalid
    else if (initNum == 'invalid number') {
      res.send('invalid number');
    }

    // unit is invalid
    else if (initUnit == 'invalid unit') {
      res.send('invalid unit');
    }

    // otherwise, number and unit are valid
    else {
      let converted = convertHandler.convert(initNum, initUnit);
      let str = convertHandler.getString(initNum, initUnit, converted[0], converted[1]);

      let returnNum = converted[0];
      let returnUnit = converted[1];
      // 'L' for liters (instead of 'l')
      initUnit = initUnit == 'l' ? 'L' : initUnit;
      returnUnit = returnUnit == 'l' ? 'L' : returnUnit;

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: str
      });
    }
  });

};
