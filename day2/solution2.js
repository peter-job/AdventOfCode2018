const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const ids = input.split("\n").slice(0, -1);

const idsMinusACharacter = ids[0]
  .split("")
  .map((c, i) => ids.map(id => id.slice(0, i) + id.slice(i + 1)));

const [shared] = idsMinusACharacter.reduce((letters, ids) => {
  const match = ids.filter((id, j) => ids.indexOf(id) !== j);
  return match.length === 1 ? match : letters;
}, null);
console.log(shared);
