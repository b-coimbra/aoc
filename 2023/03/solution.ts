import * as fs from 'fs';

const INPUT = fs.readFileSync('input.txt').toString();

const isSym = (char: string): boolean => !/\w/.test(char) && char != '.';

const getNum = (s: string, pos: number): number | undefined =>
    s.split(/(\d+)/).filter(Number).map(Number).at(pos);

type Schematic = {
    sym: string,
    row: number,
    col: number,
    numbers: number[]
};

const indexOfAll = (list: any[], s: string): any[] =>
    list.map((x, i) => x === s ? i : '').filter(String);

const seek = (str: string, pos: number): string => {
    const left = str.slice(0, pos + 1).search(/\d+$/);
    const right = str.slice(pos).search(/\D/);

    if (right < 0)
        return str.slice(left);

    return str.slice(left, right + pos);
};

const parse = (lines: string[], line: string, row: number): Schematic[] => {
    const chars = line.split('');
    const symbols = chars.filter(isSym);

    const mapped: Schematic[] = [];

    symbols.forEach((sym, i) => {
        const numbers: number[] = [];
        const indexes = indexOfAll(chars, sym);
        let col = 0;

        if (indexes.length > 1)
            col = indexes
                .filter(idx => !mapped
                    .filter(schematic => schematic.sym === sym)
                    .map(schematic => schematic.col)
                    .includes(idx))[0]
        else
            col = indexes[0];

        [row, row - 1, row + 1].map(position => numbers.push(
            ...Array.from(new Set([col, col - 1, col + 1].map(column => seek(lines[position], column)).filter(x => x).map(Number)))
        ));

        mapped.push({ sym, row, col, numbers });
    });

    return mapped;
};

const engine = INPUT
    .split("\n")
    .map(x => x.trim())
    .map((line, i, lines) => parse(lines, line, i))
    .filter(x => x.length).flat();

////////////////////////////////

const part1 = engine
    .map(schematics => schematics.numbers).flat()
    .reduce((a, b) => a + b, 0)

console.log(part1);

const part2 = engine
    .filter(schematics => schematics.sym === '*' && schematics.numbers.length === 2)
    .map(schematics => schematics.numbers.reduce((a, b) => a * b, 1))
    .reduce((a, b) => a + b, 0)

console.log(part2);
