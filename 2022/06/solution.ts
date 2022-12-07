import * as fs from 'fs';

const input = fs.readFileSync('input.txt').toString();

const countOf = (stream: string[], char: string): number =>
    stream.filter(c => c === char).length;

const repeats = (signal: string[]): boolean =>
    signal.some(c => countOf(signal, c) > 1);

const findMarker = (size: number): number => input
    .split('')
    .findIndex((letter, i) => !repeats([...input.slice(i, i + size)]))
    + size;

console.log(findMarker(4));
console.log(findMarker(14));
