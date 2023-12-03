import * as fs from 'fs';

const INPUT = fs.readFileSync('input.txt').toString();

const getId = (s: string): number => Number(s.split(/Game |:/)[1]);

type Cube = {
    red: number;
    green: number;
    blue: number;
    [key: string]: number;
};

const parse = (line: string): Cube[] => {
    const id = getId(line);

    const bag = line.split(';');
    const cubes = bag
        .map(s => Object.fromEntries(s.split(',')
        .map(x => x.trim().split(' ').reverse())));

    cubes.push({ id });

    return cubes;
};

const fits = (load: Cube, cubes: Cube[]): boolean =>
    !cubes.some(cube => Object.keys(load).some(key => load[key] < cube[key]));

const load: Cube = { red: 12, green: 13, blue: 14 };

const result = INPUT
    .split("\n")
    .filter(x => x)
    .map(parse)
    .filter(cube => fits(load, cube))
    .map(cube => cube?.find(c => c.id)?.id ?? 0)
    .reduce((a, b) => a + b, 0);

console.log(result);
