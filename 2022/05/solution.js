"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync('input.txt').toString();
var isBlank = function (x) { return x === ' ' || x === null || x === undefined; };
var isNum = function (x) { return !isBlank(x) && !isNaN(Number(x)); };
var isChar = function (x) { return !isBlank(x) && isNaN(Number(x)); };
var _a = input
    .split("\n\n")
    .map(function (x) { return x.split("\n"); }), crates = _a[0], procedures = _a[1];
var parse = function (proc) {
    var _a = proc.split(' ').map(Number), n = _a[1], from = _a[3], to = _a[5];
    return new Array(n).fill({ from: from - 1, to: to - 1 });
};
var base = crates[crates.length - 1];
var moves = procedures.flatMap(parse).reverse();
var move = function (stack, position) {
    stack[position.to].push(stack[position.from].pop());
    return stack;
};
var rearrange = function (stack, moves) {
    if (!moves.length)
        return stacks;
    return rearrange(move(stack, moves.pop()), moves);
};
var nthCrate = function (n) { return crates
    .map(function (row) { return row[n]; })
    .filter(isChar)
    .reverse(); };
var stacks = base.split('').reduce(function (acc, crate, i) {
    if (isNum(crate))
        acc.push(nthCrate(i));
    return acc;
}, []);
var answer = rearrange(stacks, moves);
// console.log(stacks);
console.log(answer);
