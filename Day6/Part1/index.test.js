const findLoop = require('./').loopFinder;

test('Given the block 0,2,7,0 returns 5', () => {
  expect(findLoop([0, 2, 7, 0])).toBe(5);
});

test('Given the input block returns 5042', () => {
  const input = [5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6];
  expect(findLoop(input)).toBe(5042);
});
