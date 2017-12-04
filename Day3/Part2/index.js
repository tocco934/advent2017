const _ = require('lodash');

const bottomRight = (layer, x, y) => (x === layer && y === -layer);
const topRight = (layer, x, y) => (x === layer && y === layer);
const topLeft = (layer, x, y) => (x === -layer && y === layer);
const bottomLeft = (layer, x, y) => (x === -layer && y === -layer);

function* generateLayer(layer) {
    let x = layer;
    let y = layer === 0 ? 0 : -layer + 1;
    let direction = [0, 1];

    while (!bottomRight(layer, x, y)) {
        yield { x, y };

        if (topRight(layer, x, y)) {
            direction = [-1, 0];
        } else if (topLeft(layer, x, y)) {
            direction = [0, -1];
        } else if (bottomLeft(layer, x, y)) {
            direction = [1, 0];
        }

        x += direction[0];
        y += direction[1];
    }
    yield { x, y };
};

function* generateSpiral() {
    let currentLayer = 0;

    while (true) {
        yield* generateLayer(currentLayer);
        currentLayer += 1;
    }
};

const addLeftSide = (x, y, grid) => {
    const coords = [`${x - 1}, ${y + 1}`, `${x - 1}, ${y}`, `${x - 1}, ${y - 1}`];

    return _.reduce(coords, (sum, coord) => {
        return sum += (grid[coord] || 0);
    }, 0);
};

const addRightSide = (x, y, grid) => {
    const coords = [`${x + 1}, ${y + 1}`, `${x + 1}, ${y}`, `${x + 1}, ${y - 1}`];

    return _.reduce(coords, (sum, coord) => {
        return sum += (grid[coord] || 0);
    }, 0);
};

const addAbove = (x, y, grid) => (grid[`${x}, ${y + 1}`] || 0);

const addBelow = (x, y, grid) => (grid[`${x}, ${y - 1}`] || 0);

const calculateNextLargest = (num) => {
    const grid = {};

    for (const coords of generateSpiral()) {
        const left = addLeftSide(coords.x, coords.y, grid);
        const right = addRightSide(coords.x, coords.y, grid);
        const top = addAbove(coords.x, coords.y, grid);
        const bottom = addBelow(coords.x, coords.y, grid);

        const calculatedVal = _.sum([left, right, top, bottom]) || 1;
        grid[`${coords.x}, ${coords.y}`] = calculatedVal;

        if (calculatedVal > num) {
            return calculatedVal;
        }
    }
};

module.exports = {
    calculateNextLargest,
};
