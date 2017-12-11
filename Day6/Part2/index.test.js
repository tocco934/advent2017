const findDoubleLoop = require('./').doubleLoopFinder;

test('Given the block 0,2,7,0 returns 5', () => {
  expect(findDoubleLoop([0, 2, 7, 0])).toBe(4);
});

test('Given the input block returns 1086', () => {
  const input = [5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6];
  expect(findDoubleLoop(input)).toBe(1086);
});
