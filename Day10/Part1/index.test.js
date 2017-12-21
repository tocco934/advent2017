const getSkipProduct = require('./').skipProduct;

test('Example list and lengths returns 12', () => {
  const list = [0, 1, 2, 3, 4];
  // const lengths = [3, 4, 1, 5];
  const lengths = [3, 4];

  expect(getSkipProduct(list, lengths)).toBe(12);
});

// test('Puzzle input returns x', () => {
//   const list = [];
//   for (let i = 0; i < 256; i += 1) {
//     list[i] = i;
//   }

//   const lengths = [70, 66, 255, 2, 48, 0, 54, 48, 80, 141, 244, 254, 160, 108, 1, 41];

//   console.log('puzzle input', getSkipProduct(list, lengths));
// });
