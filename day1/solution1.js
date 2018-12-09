const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

let shifts = input.split("\n").slice(0, -1);
let frequency = shifts.reduce((acc, shift) => acc + +shift, 0);

console.log(frequency);
