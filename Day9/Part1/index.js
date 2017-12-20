const _ = require('lodash');

const scoreGroups = (input) => {
  let score = 0;
  let level = 0;
  _.forEach(input, (char) => {
    if (char === '{') {
      level += 1;
    } else if (char === '}') {
      score += level;
      level -= 1;
    }
  });
  return score;
};

const removeUselessCharacters = (input) => {
  let garbage = false;
  let ignoreNext = false;

  const cleanedString = _.map(input, (char) => {
    if (ignoreNext) {
      ignoreNext = false;
      return '';
    } else if (char === '!') {
      ignoreNext = true;
      return '';
    } else if (char === '<') {
      garbage = true;
      return '';
    } else if (char === '>') {
      garbage = false;
      return '';
    } else if (garbage) {
      return '';
    } else if (char === ',') {
      return '';
    }
    return char;
  });

  return _.join(cleanedString, '');
};

const streamScorer = (input) => {
  const formattedString = removeUselessCharacters(input);
  return scoreGroups(formattedString);
};

module.exports = {
  streamScorer,
};
