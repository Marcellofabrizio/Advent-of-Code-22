const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

containCounter = 0;

const processLine = (line) => {
  [first, second] = line.split(",");
  [lo1, hi1] = first.split("-").map((i) => parseInt(i));
  [lo2, hi2] = second.split("-").map((i) => parseInt(i));

  if (hi1 - lo1 >= hi2 - lo2) {
    if (lo1 <= lo2 && hi1 >= hi2) {
      containCounter += 1;
    }
  } else if (hi1 - lo1 <= hi2 - lo2)
    if (lo1 >= lo2 && hi1 <= hi2) {
      containCounter += 1;
    }
};

input.forEach((line) => processLine(line));
console.log(containCounter);
