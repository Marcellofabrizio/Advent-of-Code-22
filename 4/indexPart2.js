const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

containCounter = 0;

const processLine = (line) => {
  [first, second] = line.split(",");
  [lo1, hi1] = first.split("-").map((i) => parseInt(i));
  [lo2, hi2] = second.split("-").map((i) => parseInt(i));

  const maxlo = Math.max(lo1, lo2);
  const minhi = Math.min(hi1, hi2);

  if (maxlo <= minhi) {
    containCounter += 1;
  }
};

input.forEach((line) => processLine(line));
console.log(containCounter);
