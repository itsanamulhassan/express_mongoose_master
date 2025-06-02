const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const myBell = new SchoolBell();

myBell.on("ring", () => {
  console.log("Yahoo! We can go home.");
});

myBell.on("ring", () => {
  console.log("Ah no, We have an another class");
});

myBell.on("broken", () => {
  console.log("Ales! Bell has been broken");
});

myBell.emit("ring");
myBell.emit("broken");
