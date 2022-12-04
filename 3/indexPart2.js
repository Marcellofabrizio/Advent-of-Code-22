const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

groupCounter = 0;

result = [];

const processSatchel = (satchel) => {
  first = satchel[0];
  second = satchel[1];
  third = satchel[2];

  result += [...first].filter((i) =>
    [...second].filter((i) => third.includes(i)).includes(i)
  )[0];
};

for (let i = 0; i < input.length; i += 3) {
  groupSatchels = [input[i], input[i + 1], input[i + 2]];
  processSatchel(groupSatchels);
}

console.log([...result].reduce((acc, i) => acc + (alphabet.indexOf(i) + 1), 0));
