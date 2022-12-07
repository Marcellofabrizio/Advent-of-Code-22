const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

stacks = {};

const splitIndex = input.indexOf("");

const cratesMap = input.slice(0, splitIndex - 1);
const orders = input.slice(splitIndex + 1, input.length);

const moveRegex = /move ([0-9]?[0-9]) from ([0-9]) to ([0-9])/;

console.log(orders);

cratesMap.forEach((line) => {
  for (let i = 0; i < line.length; i++) {
    if (line[i] == " ") continue;
    else if (line[i] == "[") {
      i++;
      const stack = Math.ceil(i / 4);
      if (stacks[stack]) {
        stacks[stack].unshift(line[i]);
      } else {
        stacks[stack] = [line[i]];
      }
      i++;
    }
  }
});

orders.forEach((order) => {
  const match = order.match(moveRegex);
  const amount = match[1];
  const from = match[2];
  const to = match[3];

  for (let i = 0; i < amount; i++) {
    const crate = stacks[from].pop();
    stacks[to].push(crate);
  }
});

result = "";
Object.values(stacks).forEach((stack) => {
  result += stack.pop();
});

console.log(result);
