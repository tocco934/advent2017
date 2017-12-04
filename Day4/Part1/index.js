const _ = require('lodash');

const validate = (passphrase) => {
  const uniquePhrases = _.uniq(passphrase);
  return passphrase.length === uniquePhrases.length;
};

const countValidPassphrases = (inputPassphrases) => {
  const passphrases = _.map(inputPassphrases, p => _.split(p, ' '));
  const validatePassPhrases = _.filter(passphrases, validate);
  return validatePassPhrases.length;
};

module.exports = { countValidPassphrases };
