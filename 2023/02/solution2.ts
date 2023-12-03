import * as fs from 'fs';

const INPUT = fs.readFileSync('input.txt').toString();

type Cube = {
    red: number;
    green: number;
    blue: number;
    [key: string]: number;
};

const sorted = (cubes: Cube[]): Cube[] => {
    const sets: any = {};

    for (let cube of cubes) {
        Object.keys(cube).forEach(color => {
            if (!sets[color]) sets[color] = 0;

            const num = Number(cube[color]);

            if (num > sets[color])
                sets[color] = num;
        });
    }

    return sets;
};

const parse = (line: string): Cube[] => {
    const bag = line.split(';');
    const cubes = bag
        .map(s => Object.fromEntries(s.split(',')
        .map(x => x.trim().split(' ').reverse())));

    return sorted(cubes);
};

const result = INPUT
    .split("\n")
    .filter(x => x)
    .map(parse)
    .map(cubes => Object.values(cubes).map(x => Number(x)))
    .map(colors => colors.reduce((a, b) => a * b, 1))
    .reduce((a, b) => a + b, 0);

console.log(result);
