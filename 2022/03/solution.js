const fs = require('fs');

const input = fs.readFileSync('input.txt').toString();

const rucksacks = input
      .split('\n')
      .map(x => x.trim())
      .filter(x => x);

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const assignPriorities = (letters, startAt = 0) => {
  let priority = {};

  Array.from({ length: alphabet.length })
    .map((k, v) => {
      priority[letters[v]] = startAt + 1;
      startAt += 1;
    });

  return priority;
};

let priorities = {
  ...assignPriorities(alphabet),
  ...assignPriorities(alphabet.map(x => x.toUpperCase()), 26)
};

const getCommonItem = (rucksack) => {
  const compartment = [
    rucksack.substr(0, rucksack.length / 2),
    rucksack.substr(rucksack.length / 2)
  ];

  const shared = compartment[0].match(new RegExp(`[${compartment[1]}]`))[0];

  return shared;
};

const commons = rucksacks.map(getCommonItem);

const prioritySum = commons
  .map(letter => priorities[letter])
  .reduce((acc, v) => acc + v, 0);

console.log(prioritySum);

////

const intoChunks = (array, size = 3) => {
  let chunks = [];

  for (let i = 0; i < array.length; i += size)
    chunks.push(array.slice(i, i + size));

  return chunks;
};

const badges =
  intoChunks(rucksacks).map(group => {
    const rucksack = group[0];

    return [...rucksack].find(item => group[1]?.includes(item) && group[2]?.includes(item));
  });

const misplacedItems = badges
  .map(letter => priorities[letter])
  .filter(Number)
  .reduce((acc, v) => acc + v, 0);

console.log(misplacedItems);
