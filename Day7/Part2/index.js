const _ = require('lodash');


const createTreeWithWeights = (nodeInfo, bottom) => {
  const leafsWithWeights = _.map(nodeInfo[bottom].leafs,
    leaf => createTreeWithWeights(nodeInfo, leaf));

  const totalWeight = nodeInfo[bottom].weight
    + (_.sumBy(leafsWithWeights, leaf => leaf.totalWeight) || 0);

  return {
    ...nodeInfo[bottom],
    leafs: leafsWithWeights,
    totalWeight,
  };
};

const getLeafNodes = (response) => {
  const leafNodes = [];
  const re = /[a-z]+/g;
  let m = re.exec(response);

  while (m) {
    leafNodes.push(m[0]);
    m = re.exec(response);
  }
  return leafNodes;
};

const createNodeInfo = (responses) => {
  const nodeInfo = _.map(responses, (response) => {
    const rootNode = response.match(/^[a-z]*/)[0];
    const responseWithOutRoot = _.replace(response, rootNode, '');
    const leafNodes = getLeafNodes(responseWithOutRoot);
    const rootInfo = {
      root: rootNode,
      leafs: leafNodes,
      weight: _.parseInt(response.match(/[0-9]+/)[0]),
    };
    return [rootNode, rootInfo];
  });

  return _.fromPairs(nodeInfo);
};

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

const findNewWeight = (nodeInfoWithWeight) => {
  if (_.isEmpty(nodeInfoWithWeight.leafs)) {
    return undefined;
  }

  const differentWeights = _.groupBy(nodeInfoWithWeight.leafs, 'totalWeight');

  if (Object.keys(differentWeights).length !== 2) {
    return undefined;
  }

  const offWeightList = _.filter(differentWeights, weightGroups => weightGroups.length === 1);

  if (offWeightList.length === 1) {
    const offWeight = offWeightList[0][0];
    const newWeight = findNewWeight(offWeight);
    if (!newWeight) {
      const validLeaf = _.filter(nodeInfoWithWeight.leafs, leaf =>
        leaf.totalWeight !== offWeight.totalWeight)[0];
      return offWeight.weight + (validLeaf.totalWeight - offWeight.totalWeight);
    }
    return newWeight;
  }
  // This will be reached when there are only 2 leafs and both have different total weights
  console.log('ugh got here, not implemented');
  return 3;
};

const findMissingWeight = (towerResponses) => {
  const bottomNode = findBottom([...towerResponses]);

  const nodeInfo = createNodeInfo(towerResponses);
  const nodeInfoWithWeight = createTreeWithWeights(nodeInfo, bottomNode);

  return findNewWeight(nodeInfoWithWeight);
};

module.exports = {
  findMissingWeight,
};
