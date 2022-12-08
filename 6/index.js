const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");

marker = "";

const hasRepeats = () => {
  for (let i = 0; i < marker.length; i++) {
    const tmp = marker.slice(0, i) + marker.slice(i + 1);
    if (tmp.includes(marker[i])) {
      return true;
    }
  }

  return false;
};

for (let i = 0; i < input.length; i++) {
  if (marker.length == 14) {
    if (hasRepeats()) {
      marker = marker.slice(1);
      marker += input[i];
    } else {
      console.log(i);
      break;
    }
  } else marker += input[i];

  console.log(i + 1, marker);
}
