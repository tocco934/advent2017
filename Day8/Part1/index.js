const _ = require('lodash');

const getConditionCheckFunc = (instruction) => {
  const comparisonOperator = instruction.match(/[><=!]+/)[0];
  const comparisonValue = _.parseInt(instruction.match(/(-)*[0-9]+$/)[0]);

  switch (comparisonOperator) {
    case '>':
      return valToCheck => valToCheck > comparisonValue;
    case '<':
      return valToCheck => valToCheck < comparisonValue;
    case '==':
      return valToCheck => valToCheck === comparisonValue;
    case '>=':
      return valToCheck => valToCheck >= comparisonValue;
    case '<=':
      return valToCheck => valToCheck <= comparisonValue;
    case '!=':
      return valToCheck => valToCheck !== comparisonValue;
    default:
      throw new Error(`Are not handling ${comparisonOperator}`);
  }
};

const createInstructionSet = instructions =>
  _.map(instructions, instruction => ({
    register: instruction.match(/^[a-z]+/)[0],
    increase: _.includes(instruction, 'inc'),
    change: _.parseInt(_.replace(instruction.match(/(-)*[0-9]+ if/)[0], ' if', '')),
    registerToCheck: _.replace(instruction.match(/if [a-z]+/)[0], 'if ', ''),
    conditionCheck: getConditionCheckFunc(instruction),
  }));

const maxRegisterValueCalculator = (instructions) => {
  const registers = {};

  const instructionSet = createInstructionSet(instructions);
  _.forEach(instructionSet, (instruction) => {
    let registerVal = _.isUndefined(registers[instruction.register])
      ? 0
      : registers[instruction.register];
    const valToCheck = _.isUndefined(registers[instruction.registerToCheck])
      ? 0
      : registers[instruction.registerToCheck];

    if (instruction.conditionCheck(valToCheck)) {
      if (instruction.increase) {
        registerVal += instruction.change;
      } else {
        registerVal -= instruction.change;
      }
      registers[instruction.register] = registerVal;
    }
  });

  const registerValues = _.map(registers, registerVal => registerVal);
  return _.max(registerValues);
};

module.exports = {
  maxRegisterValueCalculator,
};
