const nextLargestCalculator = require('./').calculateNextLargest;

test('Value 1 should return next largest value of 2', () => {
    expect(nextLargestCalculator(1)).toBe(2);
});

test('Value 5 should return next largest value of 10', () => {
    expect(nextLargestCalculator(5)).toBe(10);
});

test('Value 361527 should return next largest value of 363010', () => {
    expect(nextLargestCalculator(361527)).toBe(363010);
});
