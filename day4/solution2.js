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

let timesSleptOnMinute = 0;
let sleepiestMinute = 0;
let sleepiestOnThatMinute = "";

for (let id in guards) {
  let slept = guards[id].length;
  let count = guards[id].reduce((tally, minute) => {
    tally[minute] === undefined ? (tally[minute] = 1) : (tally[minute] += 1);
    return tally;
  }, {});

  for (let minute in count) {
    if (count[minute] > timesSleptOnMinute) {
      sleepiestMinute = minute;
      sleepiestOnThatMinute = id;
      timesSleptOnMinute = count[minute];
    }
  }
}

console.log(sleepiestMinute * sleepiestOnThatMinute.slice(1));
