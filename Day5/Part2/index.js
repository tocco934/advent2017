const stepCalculator = (input) => {
  let currentLocation = 0;
  let previousLocation = 0;
  let stepsTaken = 0;
  const instructions = [...input];

  while (currentLocation < input.length) {
    stepsTaken += 1;
    previousLocation = currentLocation;
    currentLocation += instructions[currentLocation];
    instructions[previousLocation] += instructions[previousLocation] >= 3 ? -1 : 1;
  }
  return stepsTaken;
};

module.exports = {
  stepCalculator,
};
