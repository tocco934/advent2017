const _ = require('lodash');

const getGroups = (input) => {
  let matches = 0;

  const re = /{*}/g;
  let m = re.exec(input);

  while (m) {
    matches += 1;
    m = re.exec(input);
  }
  return matches;
};

const streamScorer = (input) => {
  const formattedString = _.replace(input, /<.*>/g, '');
  return getGroups(formattedString);
};

module.exports = {
  streamScorer,
};
