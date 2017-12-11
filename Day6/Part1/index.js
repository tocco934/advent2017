const _ = require('lodash');

const formatDistribution = distribution => _.join(distribution, '-');

const seenBefore = (distrbution, previousDistributions) => {
  const formattedDistro = formatDistribution(distrbution);
  return _.includes(previousDistributions, formattedDistro);
};

const findMaxIndex = distros =>
  _.reduce(distros, (maxInfo, distro, i) => {
    if (distro > maxInfo.max) {
      return {
        index: i,
        max: distro,
      };
    }
    return maxInfo;
  }, { index: 0, max: 0 }).index;

const shareBlocks = (currentDistro, valToShare, totalLength, startIndex) => {
  let blocksLeft = valToShare;
  const updatedDistro = [...currentDistro];

  for (let i = startIndex; blocksLeft !== 0;) {
    if (i === totalLength) {
      i = 0;
    } else {
      updatedDistro[i] += 1;
      blocksLeft -= 1;
      i += 1;
    }
  }

  return updatedDistro;
};

const loopFinder = (blocks) => {
  const initialLength = blocks.length;
  const previousDistributions = [];
  let currentDistribution = blocks;
  let cycles = 0;

  while (!seenBefore(currentDistribution, previousDistributions)) {
    previousDistributions.push(formatDistribution(currentDistribution));
    const maxIndex = findMaxIndex(currentDistribution);

    const valueToShare = currentDistribution[maxIndex];
    currentDistribution[maxIndex] = 0;
    currentDistribution =
      shareBlocks(currentDistribution, valueToShare, initialLength, maxIndex + 1);

    cycles += 1;
  }
  return cycles;
};

module.exports = {
  loopFinder,
};
