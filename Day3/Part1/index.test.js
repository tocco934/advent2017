const distanceCalculator = require('./').calculateDistance;

test('Location 1 should return 0 distance', () => {
    expect(distanceCalculator(1)).toBe(0);
});

test('Location 12 should return 3', () => {
    expect(distanceCalculator(12)).toBe(3);
});

test('Location 361527 should return 326', () => {
    expect(distanceCalculator(361527)).toBe(326);
});
