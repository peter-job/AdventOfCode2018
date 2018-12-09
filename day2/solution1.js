const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const ids = input
  .split("\n")
  .slice(0, -1)
  .map(str => str.split(""));

const repeatsLetter = n => {
  const count = ids.reduce((acc, id) => {
    const dict = {};
    id.forEach(c => {
      dict[c] ? dict[c]++ : (dict[c] = 1);
    });
    const repeats = Object.values(dict).includes(n);
    return repeats ? acc + 1 : acc;
  }, 0);
  return count;
};

const checksum = repeatsLetter(2) * repeatsLetter(3);
console.log(checksum);
