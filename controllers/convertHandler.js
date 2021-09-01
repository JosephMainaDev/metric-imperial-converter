function ConvertHandler() {

  const formatInput = function(input) {
    // remove all white space in the input string
    input = input.replace(/\s+/g, '');

    // lowercase the input
    input = input.toLowerCase();

    try {
      // the input has alphabet characters e.g. '123.5/6 mi'
      // get the index of the first alphabet character
      let index = /[a-z]/.exec(input).index;

      // slice 'input' at the index of first alphabet character
      // the first half of input is the number, while the second half is the unit
      return [input.slice(0, index), input.slice(index)];
    } catch {
      // the input has no alpbabet characters e.g. '123.55/6'
      return [input, ""];
    }

    
  };

  this.getNum = function(input) {
    // the number part of input is the first part of the array returned
    let num = formatInput(input)[0];

    // default to 1 if no number is in the input
    if (num === "") return 1;

    // split at '/'
    num = num.split('/');

    // if the items in 'num' are more than two, then the input is a double-fraction
    if (num.length > 2) return 'invalid number';

    // if there is only one item in 'num', it is probably a valid (whole or decimal) number
    if (num.length == 1) {
      num = Number(num[0])
      return isNaN(num) ? 'invalid number' : num;
    }

    // otherwise, there are two items in 'num'
    // num[0] is the numerator, num[1] is the denominator
    num = Number(num[0]) / Number(num[1]);

    return isNaN(num) ? 'invalid number' : num;
  };
  
  this.getUnit = function(input) {
    // the unit is the second part of the array returned
    let unit = formatInput(input)[1];

    // valid input units
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    return units.includes(unit) ? unit : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    // return the unit to which 'initUnit' is converted to
    const conversion = {
      gal: 'l',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
  
    return conversion[initUnit];
  };

  this.spellOutUnit = function(unit) {
    // returns the full name of 'unit'
    const unitNames = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    
    return unitNames[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    // converts the 'initNum' of 'initUnit' to 'returnNum' of 'returnUnit'
    // and returns both 'returnNum' and 'returnUnit'.
    const galToL = 3.78541;
    const lbsToKg = 0.45359; // 0.453592;
    const miToKm = 1.60934;

    let returnNum = null;

    switch (initUnit) {
      case 'gal':
        returnNum = initNum * galToL;
        break;
      case 'l':
        returnNum = initNum / galToL;
        break;
      case 'mi':
        returnNum = initNum * miToKm;
        break;
      case 'km':
        returnNum = initNum / miToKm;
        break;
      case 'kg':
        returnNum = initNum / lbsToKg;
        break;
      case 'lbs':
        returnNum = initNum * lbsToKg;
        break;
    };

    let returnUnit = this.getReturnUnit(initUnit);
    // +str turns str to a number
    return [+returnNum.toFixed(5), returnUnit];
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // example return string: 1 liters converts to 0.26417 gallons

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
};

module.exports = ConvertHandler;
