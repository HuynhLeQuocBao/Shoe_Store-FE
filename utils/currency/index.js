export const convertCurrency = (number) => {
  var numeral = require('numeral');
  return numeral(number).format('$0,0.00');
};
