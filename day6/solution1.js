const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const coords = input.split("\n").slice(0, -1);
const pairs = coords.map(item => item.split(", ").map(str => +str));

let rows = 1 + pairs.reduce((max, pair) => (pair[0] > max ? pair[0] : max), 0);
let cols = 1 + pairs.reduce((max, pair) => (pair[1] > max ? pair[1] : max), 0);

const getDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const findClosest = (x1, y1, coords) => {
  return coords.reduce(
    (min, [x2, y2], id) => {
      const distance = getDistance(x1, y1, x2, y2);
      if (distance < min.distance) {
        min.distance = distance;
        min.id = id;
      } else if (distance === min.distance) {
        min.id = "MULTIPLE";
      }
      return min;
    },
    { id: -1, distance: 1000 }
  );
};

const checkIfInfinite = (x, y) =>
  x === 0 || x === rows - 1 || (y === 0 || y === cols - 1);

const area = {};

const infinite = new Set();

for (let x = 0; x <= rows; x++) {
  for (let y = 0; y <= cols; y++) {
    const closest = findClosest(x, y, pairs);
    if (checkIfInfinite(x, y)) {
      infinite.add(closest.id);
    }
    area[closest.id] ? area[closest.id]++ : (area[closest.id] = 1);
  }
}

infinite.forEach(id => {
  delete area[+id];
});

let max = Object.keys(area).reduce(
  (max, id) => (area[id] > max ? area[id] : max),
  0
);

console.log(max);
