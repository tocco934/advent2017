const _ = require('lodash');

const cleanResponses = (responses) => {
  const cleanedResponses = _.flatMap(responses, (response) => {
    const weightRemoved = _.replace(response, /\([0-9]*\)/, ',');
    const leafSymbolRemoved = _.replace(weightRemoved, ' -> ', '');
    const splitOnComma = _.split(leafSymbolRemoved, ',');
    return _.compact(splitOnComma);
  });
  return _.map(cleanedResponses, _.trim);
};


const findBottom = (towerResponses) => {
  const cleanedResponses = cleanResponses(towerResponses);

  const responseCounter = {};
  _.each(cleanedResponses, (response) => {
    responseCounter[response] = responseCounter[response] + 1 || 1;
  });

  return _.findKey(responseCounter, count => count === 1);
};

module.exports = {
  findBottom,
};
