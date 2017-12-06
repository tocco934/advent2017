const _ = require('lodash');

const dividesToWholeNumberWithChoices = (num, choices) =>
  !_.isEmpty(choices) &&
  _.some(choices, c => ((c / num) % 1 === 0) || ((num / c) % 1 === 0));

const calculateChecksum = (row) => {
  const evenDividers = _.filter(row, (val) => {
    const rowWithoutVal = _.filter(row, r => r !== val);
    const dividesEvenly = dividesToWholeNumberWithChoices(val, rowWithoutVal);
    return dividesEvenly;
  });

  return (evenDividers[0] / evenDividers[1]) % 1 === 0
    ? evenDividers[0] / evenDividers[1]
    : evenDividers[1] / evenDividers[0];
};

const calculateChecksums = input =>
  _.reduce(input, (sum, row) => sum + (calculateChecksum(row) || 0), 0);

module.exports = {
  calculateChecksums,
};
