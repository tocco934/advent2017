const fs = require('fs');
const scoreStream = require('./').streamScorer;

test('Returns 0 when given an empty garbage group', () => {
  expect(scoreStream('<>')).toBe(0);
});

test('Returns 17 when given a non empty garbage group', () => {
  expect(scoreStream('<random characters>')).toBe(17);
});

test('Returns 3 when given <<<<>', () => {
  expect(scoreStream('<<<<>')).toBe(3);
});

test('Returns 6 when given <{!>}>', () => {
  expect(scoreStream('<{!>}>')).toBe(2);
});

test('<!!>', () => {
  expect(scoreStream('<!!>')).toBe(0);
});

test('<!!!>>', () => {
  expect(scoreStream('<!!!>>')).toBe(0);
});

test('<{o"i!a,<{i<a>', () => {
  expect(scoreStream('<{o"i!a,<{i<a>')).toBe(10);
});

test('Test input returns 7031', () => {
  const input = fs.readFileSync('./Day9/Part2/input.txt').toString();
  expect(scoreStream(input)).toBe(7031);
});
