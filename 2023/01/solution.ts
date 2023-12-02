import * as fs from 'fs';

const INPUT = fs.readFileSync('input.txt').toString();

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const toNum = (s: string): number => {
    const nums = s.split('').filter(x => Number(x));

    return Number([nums.at(0), nums.at(-1)].join(''));
}

const unglue = (s: string) => {
    digits.forEach((digit, i) => {
        const common = digits.find(d => d[0] === digit.at(-1));

        if (common)
            s = s.replace(
                digit + common.substr(1),
                (i + 1) + String(digits.findIndex(x => x === common) + 1)
            );
    });

    return s;
}

const convert = (s: string): string => {
    digits.forEach((digit, i) => s = s.replaceAll(digit, String(i + 1)));

    return s;
}

const calibrated = INPUT
    .split("\n")
    .map(unglue)
    .map(convert)
    .map(toNum)
    .reduce((a, b) => a + b);

console.log(calibrated);
