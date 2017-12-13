const scoreStream = require('./').streamScorer;

test('Returns 1 when given a single group', () => {
  expect(scoreStream('{}')).toBe(1);
});

test('Returns 3 when given 3 nested groups', () => {
  expect(scoreStream('{{{}}}')).toBe(3);
});

test('Returns 3 when given groups that aren\'t all nested', () => {
  expect(scoreStream('{{},{}}')).toBe(3);
});

test('Returns 6 when given a larger set of groups', () => {
  expect(scoreStream('{{{},{},{{}}}}')).toBe(6);
});

test('Doesn\'t care what is in between the brackets to count a group', () => {
  expect(scoreStream('{<a>,<a>,<a>,<a>}')).toBe(1);
});

test('Ignores any garbage even if there are groups inside of it', () => {
  expect(scoreStream('{<{},{},{{}}>}')).toBe(1);
});
