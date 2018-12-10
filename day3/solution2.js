const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
let entries = input.split("\n").slice(0, -1);

// claim format: '#1282 @ 286,137: 20x25'
let claims = entries.map(entry => {
  const id = entry.match(/^#\d+/)[0];
  const left = parseInt(entry.match(/@ \d+/)[0].slice(2));
  const top = parseInt(entry.match(/,\d+/)[0].slice(1));
  const right = left + parseInt(entry.match(/\d+x/)[0].slice(0, -1));
  const bottom = top + parseInt(entry.match(/x\d+/)[0].slice(1));
  const valid = true;
  return {
    id,
    left,
    top,
    right,
    bottom,
    valid
  };
});

let fabric = new Array(1000)
  .fill(new Array(1000).fill(null))
  .map(square => square.slice());

let checkClaims = () => {
  claims.forEach(claim => {
    for (let i = claim.top; i < claim.bottom; i++) {
      for (let j = claim.left; j < claim.right; j++) {
        if (fabric[i][j] !== null && fabric[i][j] !== claim.id) {
          claim.valid = false;
        }
        fabric[i][j] = claim.id;
      }
    }
  });
};

checkClaims();
checkClaims();

let validClaim = claims.filter(claim => claim.valid === true);

console.log(...validClaim);
