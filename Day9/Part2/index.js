const _ = require('lodash');

const countGarbage = (input) => {
  let garbage = false;
  let ignoreNext = false;
  let garbageCount = 0;

  _.map(input, (char) => {
    if (ignoreNext) {
      ignoreNext = false;
      return '';
    } else if (char === '!') {
      ignoreNext = true;
      return '';
    } else if (char === '<') {
      if (garbage) {
        garbageCount += 1;
      }
      garbage = true;
      return '';
    } else if (char === '>') {
      garbage = false;
      return '';
    } else if (garbage) {
      garbageCount += 1;
      return '';
    } else if (char === ',') {
      return '';
    }
    return char;
  });

  return garbageCount;
};

const streamScorer = input => countGarbage(input);

module.exports = {
  streamScorer,
};
