const _ = require('lodash');

const calculateChecksums = input =>
  _.reduce(input, (sum, row) => sum + (_.max(row) - _.min(row)), 0);

module.exports = {
  calculateChecksums,
};
