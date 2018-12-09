const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
let shifts = input.split("\n").slice(0, -1);

const log = {};
let first = null;
let freq = 0;

while (first === null) {
  freq = shifts.reduce((acc, shift) => {
    log[acc] && first === null ? (first = acc) : (log[acc] = true);
    return acc + +shift;
  }, freq);
}

console.log(first);
