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

const calculateDistance = (num) => {
    let currentVal = 1;

    for (const coord of generateSpiral()) {
        if (currentVal === num) {
            return Math.abs(coord.x) + Math.abs(coord.y);
        }
        currentVal += 1;
    }
};

module.exports = {
    calculateDistance,
};
