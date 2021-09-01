const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  // TEST 1
  test("convertHandler should correctly read a whole number input", function() {
    assert.equal(convertHandler.getNum('5mi'), 5);
    assert.equal(convertHandler.getNum('3 kg'), 3);
    assert.equal(convertHandler.getNum(' 3 kg '), 3);
  });

  // TEST 2
  test("convertHandler should correctly read a decimal number input", function() {
    assert.equal(convertHandler.getNum('5.1mi'), 5.1);
    assert.equal(convertHandler.getNum('3.123 kg'), 3.123);
    assert.equal(convertHandler.getNum(' 0.03 kg '), 0.03);
  });

  // TEST 3
  test("convertHandler should correctly read a fractional input", function() {
    assert.equal(convertHandler.getNum('5/2mi'), 5/2);
    assert.equal(convertHandler.getNum('3/3 kg'), 3/3);
    assert.equal(convertHandler.getNum(' 3/23 kg '), 3/23);
  });

  // TEST 4
  test("convertHandler should correctly read a fractional input with a decimal", function() {
    assert.equal(convertHandler.getNum('5.1/2mi'), 5.1/2);
    assert.equal(convertHandler.getNum('3.3/2 kg'), 3.3/2);
    assert.equal(convertHandler.getNum(' 3.12/2.12 kg '), 3.12/2.12);
  });

  // TEST 5
  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function() {
    assert.equal(convertHandler.getNum('5.1/2/1mi'), 'invalid number');
    assert.equal(convertHandler.getNum('3.3/2 /1 kg'), 'invalid number');
    assert.equal(convertHandler.getNum(' 3.12/2.1/2 kg '), 'invalid number');
  });

  // TEST 6
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function() {
    assert.equal(convertHandler.getNum('mi'), 1);
    assert.equal(convertHandler.getNum('l'), 1);
    assert.equal(convertHandler.getNum('lbs'), 1);
  });

  // TEST 7
  test("convertHandler should correctly read each valid input unit", function() {
    assert.equal(convertHandler.getUnit('5mi'), 'mi');
    assert.equal(convertHandler.getUnit('5 mi'), 'mi');
    assert.equal(convertHandler.getUnit('5.5mi'), 'mi');
    assert.equal(convertHandler.getUnit('5/2mi'), 'mi');
    assert.equal(convertHandler.getUnit('5/2.1 mi'), 'mi');
    assert.equal(convertHandler.getUnit('5.5l'), 'l');
  });

  // TEST 8
  test("convertHandler should correctly return an error for an invalid input unit", function() {
    assert.equal(convertHandler.getUnit('5mile'), 'invalid unit');
    assert.equal(convertHandler.getUnit('mile'), 'invalid unit');
    assert.equal(convertHandler.getUnit('50'), 'invalid unit');
  });

  // TEST 9
  test("convertHandler should return the correct return unit for each valid input unit", function() {
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('l'), 'gal');
  });

  // TEST 10
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function() {
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('l'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
  });

  // TEST 11
  test("convertHandler should correctly convert gal to l", function() {
    assert.deepEqual(convertHandler.convert(1, 'gal'), [3.78541, 'l']);
  });

  // TEST 12
  test("convertHandler should correctly convert l to gal", function() {
    assert.deepEqual(convertHandler.convert(1, 'l'), [0.26417, 'gal']);
  });

  // TEST 13
  test("convertHandler should correctly convert mi to km", function() {
    assert.deepEqual(convertHandler.convert(1, 'mi'), [1.60934, 'km']);
  });

  // TEST 14
  test("convertHandler should correctly convert km to mi", function() {
    assert.deepEqual(convertHandler.convert(1, 'km'), [0.62137, 'mi']);
  });

  // TEST 15
  test("convertHandler should correctly convert lbs to kg", function() {
    assert.deepEqual(convertHandler.convert(1, 'lbs'), [0.45359, 'kg']);
  });

  // TEST 16
  test("convertHandler should correctly convert kg to lbs", function() {
    assert.deepEqual(convertHandler.convert(1, 'kg'), [2.20463, 'lbs']);
  });

  // TEST 17
  test("convertHandler should correctly format the return string", function() {
    assert.equal(convertHandler.getString(1, 'l', 0.26417, 'gal'), "1 liters converts to 0.26417 gallons");
  });
});