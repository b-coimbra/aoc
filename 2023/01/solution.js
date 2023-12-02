"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const INPUT = fs.readFileSync('input.txt').toString();
const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const toNum = (s) => {
    const nums = s.split('').filter(x => Number(x));
    return Number([nums.at(0), nums.at(-1)].join(''));
};
const unglue = (s) => {
    digits.forEach((digit, i) => {
        const common = digits.find(d => d[0] === digit.at(-1));
        if (common)
            s = s.replace(digit + common.substr(1), (i + 1) + String(digits.findIndex(x => x === common) + 1));
    });
    return s;
};
const convert = (s) => {
    digits.forEach((digit, i) => s = s.replaceAll(digit, String(i + 1)));
    return s;
};
const calibrated = INPUT
    .split("\n")
    .map(unglue)
    .map(convert)
    .map(toNum)
    .reduce((a, b) => a + b);
console.log(calibrated);
