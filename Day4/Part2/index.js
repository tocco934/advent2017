const _ = require('lodash');

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31,
  37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];

const validate = (passphrase) => {
  const phraseValues = _.map(passphrase, phrase =>
    _.reduce(phrase, (product, character) =>
      product * primes[character.charCodeAt(0) - 'a'.charCodeAt(0)], 1),
  );

  const uniquePhraseValues = _.uniq(phraseValues);
  return passphrase.length === uniquePhraseValues.length;
};

const countValidPassphrases = (inputPassphrases) => {
  const passphrases = _.map(inputPassphrases, p => _.split(p, ' '));
  const validatePassPhrases = _.filter(passphrases, validate);
  return validatePassPhrases.length;
};

module.exports = { countValidPassphrases };
