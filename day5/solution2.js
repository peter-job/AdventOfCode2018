const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

let chain = input.split("").slice(0, -1);

const lowerUpper = (a, b) => a.toUpperCase() === b && b.toLowerCase() === a;
const upperLower = (a, b) => a.toLowerCase() === b && b.toUpperCase() === a;
const trigger = (a, b) => lowerUpper(a, b) || upperLower(a, b);

function react(chain) {
  copy = chain.slice();
  for (let i = 0; i < copy.length - 1; i++) {
    if (trigger(copy[i], copy[i + 1])) {
      copy.splice(i, 2);
      i < 2 ? (i = -1) : (i -= 2);
    }
  }
  return copy;
}

function removeType(chain, letter) {
  let arr = chain.join("").split(letter.toLowerCase());
  arr = arr.join("").split(letter.toUpperCase());
  arr = arr.join("").split("");
  return arr;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const smallest = alphabet.reduce((min, letter) => {
  const polymer = react(removeType(chain, letter));
  return polymer.length < min ? polymer.length : min;
}, chain.length);

console.log(smallest);
