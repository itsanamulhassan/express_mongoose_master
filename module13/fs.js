// ------------------------------------------------------------------------
// Node.js File System (fs) Module:
// - Provides functions to interact with the file system.
// - Supports both synchronous and asynchronous methods.
// Common Methods:
// - fs.readFile / fs.readFileSync: Read file contents.
// - fs.writeFile / fs.writeFileSync: Write or replace file contents.
// - fs.appendFile / fs.appendFileSync: Append data to a file.
// - fs.unlink / fs.unlinkSync: Delete a file.
// - fs.mkdir / fs.mkdirSync: Create a directory.
// - fs.readdir / fs.readdirSync: Read directory contents.
// - fs.stat / fs.statSync: Get file or directory information.
// Use 'require("fs")' to import the module.
// ------------------------------------------------------------------------

// Synchronous way to read the file

// When Node.js handles I/O-intensive tasks synchronously, it behaves in a blocking manner — meaning:
// --The execution of code stops until the I/O operation (e.g., file read/write, API call) is complete.
// -- Other tasks in the event loop have to wait, which reduces performance and scalability.
// -- This goes against Node.js's strength (non-blocking I/O), making it inefficient for handling many requests or users at once.

const fs = require("fs");

const data = fs.readFileSync("./module13/input.txt", { encoding: "utf-8" });
const text = "Hello, My name is Anamul Hassan";

fs.writeFileSync("./module13/input.txt", text);

console.log(data);
