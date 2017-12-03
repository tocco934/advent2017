const _ = require('lodash');

const nextNumberSameCheck = (digits, digit, i) =>
  (i === (digits.length - 1)
    ? digit === digits[0]
    : digit === digits[i + 1]);


module.exports = (inputDigits) => {
  const digits = _.map(_.split(inputDigits, ''), _.parseInt);

  if (digits.length <= 1) {
    return 0;
  }

  return _.reduce(digits, (sum, digit, i) =>
    (nextNumberSameCheck(digits, digit, i)
      ? sum + digit
      : sum)
    , 0);
};
