const _ = require('lodash');

const halfwayAroundCheck = (digits, digit, i) => {
  const halfwayIndex = (i + (digits.length / 2) >= digits.length)
    ? (i + (digits.length / 2)) - (digits.length)
    : i + (digits.length / 2);
  return digit === digits[halfwayIndex];
};


module.exports = (inputDigits) => {
  const digits = _.map(_.split(inputDigits, ''), _.parseInt);

  if (digits.length <= 1) {
    return 0;
  }

  return _.reduce(digits, (sum, digit, i) =>
    (halfwayAroundCheck(digits, digit, i)
      ? sum + digit
      : sum)
    , 0);
};
