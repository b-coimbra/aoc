import * as fs from 'fs';

const input = fs.readFileSync('input.txt').toString();

type Stack = string[][];
type Crate = string[];
type Move  = { from: number; to: number };

const isNum = (x: any) => /\d/.test(x);
const isChar = (x: any) => !isNum(x) && /\w/.test(x);

const [crates, procedures] = input
    .split("\n\n")
    .map(x => x.split("\n"));

const parse = (proc: string): Move[] => {
    const [, n, , from, , to] = proc.split(' ').map(Number);

    return new Array(n).fill({ from: from - 1, to: to - 1 });
};

const base = crates[crates.length - 1];

const moves = procedures.flatMap(parse).reverse();

const move = (stack: Stack, position: Move): Stack => {
    stack[position.to]?.push(stack[position.from].pop()!)
    return stack;
};

const rearrange = (stack: Stack, moves: Move[]): Stack => {
    if (!moves.length) return stacks;
    return rearrange(move(stack, moves.pop()!), moves);
};

const nthCrate = (n): Crate => crates
    .map(row => row[n])
    .filter(isChar)
    .reverse();

const stacks = base.split('').reduce((acc, crate, i) => {
    if (isNum(crate)) acc.push(nthCrate(i));
    return acc;
}, [] as Stack);

let answer = rearrange(stacks, moves)
    .map(x => x.pop())
    .join('');

console.log(answer);
