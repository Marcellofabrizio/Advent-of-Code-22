const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

currentDirsum = 0;
currentDirs = [];
fileSizes = { "/": 0 };

input.forEach((line) => {
  const command = line.split(" ");
  switch (command[0]) {
    case "dir":
      break;
    case "$":
      if (command[1] == "ls") {
        break;
      } else if (command[1] == "cd") {
        if (command[2] == "..") {
          currentDirs.pop();
        } else if (command[2] == "/") {
          currentDirs = ["/"];
        } else {
          currentDirs.push(command[2] + "/");
        }
      }
      break;
    default:
      auxStr = "";
      fileSizes["/"] += parseInt(command[0]);
      currentDirs.reduce((str, i) => {
        if (fileSizes[str + i]) fileSizes[str + i] += parseInt(command[0]);
        else fileSizes[str + i] = parseInt(command[0]);
        return str + i;
      });
      break;
  }
});

console.log(
  Object.values(fileSizes)
    .filter((i) => i <= 100000)
    .reduce((acc, i) => acc + i, 0)
);

console.log(
  Math.min(...Object.values(fileSizes).filter((i) => i >= fileSizes["/"] - 40000000))
);
