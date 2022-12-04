const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

result = [];

const processSatchel = (first, second) => {
  result += [...first].filter((i) => second.includes(i))[0];
};

input.forEach((line) => {
  firstSatchel = {};
  secondSatchel = {};
  const middle = line.length / 2;
  let first = line.slice(0, middle);
  let second = line.slice(middle, line.length);
  processSatchel(first, second);
});

console.log([...result].reduce((acc, i) => acc + (alphabet.indexOf(i) + 1), 0));
