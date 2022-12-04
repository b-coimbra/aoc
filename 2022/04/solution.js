const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

const pairs = input.trim().split("\n").map(x => x.split(","));

const range = ([start, end]) => {
  const length = (end + 1) - start;
  return Array.from({ length }, (_, i) => start + i);
};

const toSection = (pair) => pair.split('-').map(Number);

const contains = ([p1, p2]) =>
      p1.every(pair => p2.includes(pair)) ||
      p2.every(pair => p1.includes(pair));

const sections = pairs.map(pair => pair.map(toSection));

const containedPairs = sections
      .map(x => x.map(range))
      .filter(contains);

console.log(containedPairs.length);

//// PART 2

const overlaps = ([[a, b], [x, y]]) => a <= y && x <= b;

const overlappingPairs = sections.filter(overlaps);

console.log(overlappingPairs.length);
