const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const coords = input.split("\n").slice(0, -1);
const pairs = coords.map(item => item.split(", ").map(str => +str));

let rows = 1 + pairs.reduce((max, pair) => (pair[0] > max ? pair[0] : max), 0);
let cols = 1 + pairs.reduce((max, pair) => (pair[1] > max ? pair[1] : max), 0);

const getDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const totalDistance = (x1, y1, coords) => {
  return coords.reduce((sum, [x2, y2]) => sum + getDistance(x1, y1, x2, y2), 0);
};

const area = [];

for (let x = 0; x <= rows; x++) {
  for (let y = 0; y <= cols; y++) {
    if (totalDistance(x, y, pairs) < 10000) {
      area.push([x, y]);
    }
  }
}

console.log(area.length);
