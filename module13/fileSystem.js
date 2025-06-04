// ------------------------------------------------------------------------
// Node.js File System (fs) Module:
// ------------------------------------------------------------------------
// - The 'fs' module allows interaction with the file system.
// - It provides both synchronous (blocking) and asynchronous (non-blocking) methods.

// 📦 Common Methods:
// - fs.readFile / fs.readFileSync        → Read file contents.
// - fs.writeFile / fs.writeFileSync      → Write or replace file contents.
// - fs.appendFile / fs.appendFileSync    → Append data to a file.
// - fs.unlink / fs.unlinkSync            → Delete a file.
// - fs.mkdir / fs.mkdirSync              → Create a directory.
// - fs.readdir / fs.readdirSync          → Read directory contents.
// - fs.stat / fs.statSync                → Get file or directory info.

// 📌 To use it:
const fs = require("fs");

// ========================================================================
// 🧱 1. Synchronous File Operations (Blocking)
// ========================================================================

// ⚠️ These block the entire program until the task is finished.
// ⚠️ Not recommended for high-traffic or real-time apps.

console.log("=== Synchronous Example ===");

const syncData = fs.readFileSync("./module13/input.txt", { encoding: "utf-8" });
console.log("Synchronous read: ", syncData);

const syncText = "Hello, My name is Anamul Hassan";
fs.writeFileSync("./module13/input.txt", syncText);
console.log("Synchronous write complete.");

// ------------------------------------------------------------------------
// 🔍 Note:
// - During readFileSync/writeFileSync, no other code runs until it's done.
// - Suitable only for scripts or small tools, not for production servers.
// ------------------------------------------------------------------------

// ========================================================================
// 🚀 2. Asynchronous File Operations (Non-blocking)
// ========================================================================

// ✅ Node.js uses a non-blocking model for better performance.
// ✅ These methods do not halt the execution of the remaining code.

console.log("=== Asynchronous Example ===");

console.log("task 1");

// Initially set sampleText
let sampleText = "initial text";

// Async write to file
fs.writeFile("./module13/input.txt", sampleText, "utf-8", (error) => {
  if (error) {
    console.log("❌ Write failed:", error);
    return;
  }
  console.log("✅ Async write complete.");
});

// Async read from file
fs.readFile("./module13/input.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("❌ Read failed:", error);
    return;
  }
  sampleText = data;
  console.log("✅ Async read data -->", data);
});

console.log("sampleText (outside callback):", sampleText);
console.log("task 2");

// ------------------------------------------------------------------------
// 🔍 Note:
// - The last console.log runs before the file is actually read!
// - Async operations use callbacks (or Promises) and return later.
// - This improves scalability, especially for servers handling many users.
// ------------------------------------------------------------------------
