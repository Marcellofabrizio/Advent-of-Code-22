const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

dirSum = 0;
dirs = [];
fileSizes = {};

input.forEach((line) => {
  const command = line.split(" ");
  switch (command.length) {
    case 2:
      if (command[0] == "dir") {
        break;
      } else if (command[0] == "$") {
        break;
      } else {
        dirs.reduce((str, i) => {
          str = str + i;
          console.log(str);
          if (fileSizes[str]) fileSizes[str] += parseInt(command[0]);
          else fileSizes[str] = parseInt(command[0]);
        });
      }
      break;
    case 3:
      if (command[1] == "cd") {
        if (command[2] == "..") {
          dirs.pop();
        } else if (command[2] == "/") {
          dirs = ["/"];
        } else {
          dirs.push(command[2] + "/");
        }
      }
      break;
  }
});

console.log(dirs.reduce((str, i) => str + i));

console.log(
  Object.values(fileSizes)
    .filter((i) => i <= 100000)
    .reduce((acc, i) => acc + i, 0)
);
