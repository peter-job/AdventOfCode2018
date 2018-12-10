const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

let chain = input.split("").slice(0, -1);

const lowerUpper = (a, b) => a.toUpperCase() === b && b.toLowerCase() === a;
const upperLower = (a, b) => a.toLowerCase() === b && b.toUpperCase() === a;
const trigger = (a, b) => lowerUpper(a, b) || upperLower(a, b);

function react(chain) {
  for (let i = 0; i < chain.length - 1; i++) {
    if (trigger(chain[i], chain[i + 1])) {
      chain.splice(i, 2);
      i < 2 ? (i = -1) : (i -= 2);
    }
  }
}

react(chain);

console.log(chain.length);
