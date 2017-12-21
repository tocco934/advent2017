const _ = require('lodash');

const reverseSingleSpan = (list, pos, length) => {
  const listToReverse = _.slice(list, pos, pos + length);
  const reversedList = _.reverse(listToReverse);
  let remainderBefore = [];
  let remainderAfter = [];

  if (pos !== 0) {
    remainderBefore = _.slice(list, 0, pos);
  }

  if ((pos + length) <= list.length) {
    remainderAfter = _.slice(list, pos + length, list.length);
  }

  return _.concat(remainderBefore, reversedList, remainderAfter);
};

const reverseWrapSpan = (list, pos, length, skipSize) => {
  const firstReverseHalf = _.slice(list, pos, list.length);
  const remainder = ((pos + length + skipSize) - firstReverseHalf.length) - list.length;
  const secondReverseHalf = _.slice(list, 0, remainder);

  console.log('pos', pos);
  console.log('listlength', list.length);
  console.log('firstReverseHalf', firstReverseHalf);
  console.log('remainder', remainder);
  console.log('secondReverseHalf', secondReverseHalf);

  const reversedList = _.reverse(_.concat(firstReverseHalf, secondReverseHalf));
  const reversedAfter = _.slice(reversedList, 0, (reversedList.length - remainder) + 1);
  const reversedBefore = _.slice(reversedList, (reversedList.length - remainder) + 1);

  const remainingList = _.slice(list, remainder + 1, pos);

  return _.concat(reversedBefore, remainingList, reversedAfter);
};

const increasePosition = (pos, length, skipSize, listLength) => {
  if ((pos + length + skipSize) >= listLength) {
    const remainder = (pos + length + skipSize) - listLength;
    return remainder;
  }
  return pos + length + skipSize;
};

const performSkips = (list, lengths) => {
  let currentList = [...list];
  let skipSize = 0;
  let currentPosition = 0;

  _.forEach(lengths, (length) => {
    if (length > list.length) {
      console.log('Invalid Length', length);
    }

    if ((currentPosition + length) >= list.length) {
      currentList = reverseWrapSpan(currentList, currentPosition, length, skipSize);
    } else {
      currentList = reverseSingleSpan(currentList, currentPosition, length);
    }

    // increase current position
    currentPosition = increasePosition(currentPosition, length, skipSize, list.length);
    skipSize += 1;
    console.log(currentList);
  });

  return currentList;
};

const skipProduct = (list, lengths) => {
  const skippedList = performSkips(list, lengths);

  return skippedList[0] * skippedList[1];
};

module.exports = {
  skipProduct,
};
