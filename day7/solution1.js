const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const instructions = input.split("\n").slice(0, -1);

before = {}; // values must come before key
after = {}; // values must come after key
instructions.forEach(i => {
  //example instruction: 'Step M must be finished before step D can begin.'
  const a = i[5];
  const b = i[36];
  before[b] ? before[b].push(a) : (before[b] = [a]);
  after[a] ? after[a].push(b) : (after[a] = [b]);
});

for (let key in before) {
  before[key].sort();
}
for (let key in after) {
  after[key].sort();
}

let toComplete = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .filter(c => before[c] || after[c]);

const prereq = step => {
  if (!toComplete.includes(step)) {
    return false;
  }
  if (!before[step]) {
    return true;
  }
  return !before[step].some(step => toComplete.includes(step));
};

let order = "";

const findOrder = steps => {
  steps.forEach(step => {
    if (prereq(step)) {
      toComplete = toComplete.filter(s => s != step);
      order += step;
      after[step]
        ? findOrder(after[step].concat(steps).sort())
        : findOrder(toComplete);
    }
  });
};

while (toComplete.length > 0) {
  findOrder(toComplete);
}

console.log(order);
