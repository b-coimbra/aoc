import * as fs from 'fs';

const INPUT = fs.readFileSync('input.txt').toString();

type Card = {
    id: number,
    score: number[],
    points: number
}

const parse = (card: string): Card => {
    const [id, numbers] = card.split(':');

    const [drawn, owned] = numbers
        ?.split('|')
        ?.map(nums => nums.split(' ').filter(x => x).map(Number)) as number[][];

    const score = owned.filter(num => drawn.includes(num));

    const points = score.slice(1).reduce((acc, curr) => acc *= 2, 1);

    return {
        id: Number(id),
        score,
        points: score.length ? points : 0
    };
}

const nextCards = (scratchcards: Card[], start: number, amount: number): Card[] =>
    scratchcards.slice(start, amount + start);

const copy = (scratchcards: Card[], card: Card): void => {
    const next = nextCards(scratchcards, card.id, card.score.length);

    if (next.length)
        next.forEach(c => copy(scratchcards, c));

    copies.push(card);
}

const base = INPUT
    .trim()
    .split("\n")
    .map(line => line.replace('Card ', ''))
    .map(parse);

//////////////////////////////////////////////////////////////////////

const points = base
    .map(card => card.points)
    .reduce((a, b) => a + b, 0);

console.log(points);

/////////////////////////////////////////////////////////////////////

const copies: Card[] = [];

base.forEach(card => copy(base, card));

console.log(copies.map(x => x.id).length);
