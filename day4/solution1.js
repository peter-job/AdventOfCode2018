const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
let records = input
  .split("\n")
  .slice(0, -1)
  .sort();

// entry format: '[1518-11-21 00:00] Guard #3203 begins shift'

const getID = record => (record[25] === "#" ? record.match(/#\d+/)[0] : null);
const getAction = record => record.slice(19);
const getMinute = record => record.slice(15, 17);

const guardIDs = records
  .filter(record => getID(record))
  .map(record => getID(record));
const guards = {};
guardIDs.forEach(id => {
  guards[id] = [];
});

let currentID;
let asleepAt;
records.forEach(record => {
  const id = getID(record);
  const action = getAction(record);
  const time = +getMinute(record);
  if (id) {
    currentID = id;
  } else {
    if (action === "falls asleep") {
      asleepAt = time;
    } else if (action === "wakes up") {
      for (let minute = asleepAt; minute < time; minute++) {
        guards[currentID].push(minute);
      }
    }
  }
});

let sleepiest = "";
let longest = 0;
for (let id in guards) {
  guard = guards[id];
  if (guard.length > longest) {
    sleepiest = id;
    longest = guard.length;
  }
}

let tally = guards[sleepiest].reduce((tally, minute) => {
  tally[minute] ? (tally[minute] += 1) : (tally[minute] = 1);
  return tally;
}, {});

let sleepiestMinute = 1;
for (let minute in tally) {
  if (tally[minute] > tally[sleepiestMinute]) {
    sleepiestMinute = minute;
  }
}

console.log(sleepiest.slice(1) * sleepiestMinute);
