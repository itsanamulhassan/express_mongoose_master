const path = require("path");
const fs = require("fs");

// 🕒 Generate timestamp and combine with CLI arguments
const timeStamp = new Date().toISOString();
const inputArguments = `${timeStamp}: ${process.argv.slice(2).join(" ")} \n`;

// ----------------------------------------------------------------------
// This section was your manual way (commented out):
// It reads existing file content, then appends new input with a write.
// Not needed with fs.appendFile(), which handles it more efficiently.
// ----------------------------------------------------------------------

// fs.readFile("./log.txt", "utf-8", (readingError, data) => {
//   if (readingError) {
//     throw Error("Reading error", readingError);
//   }
//   if (data) {
//     fs.writeFile("./log.txt", data.concat(" ", inputArguments), (error) => {
//       if (error) {
//         throw Error("Writing error: ", error);
//       }
//       console.log("Written successfully with previous data");
//     });
//   } else {
//     fs.writeFile("./log.txt", inputArguments, (error) => {
//       if (error) {
//         throw Error("Writing error: ", error);
//       }
//       console.log("Written successfully");
//     });
//   }
// });

// ----------------------------------------------------------------------
// Optional safety check — prevents empty logs when no input is passed
// ----------------------------------------------------------------------

// if (!inputArguments) {
//   console.log("❌ Please provide a message to log");
//   console.log("Example: node index.js Hello World!");
//   process.exit(1);
// }

// ✅ Construct absolute path for log.txt file
const filePath = path.join(__dirname, "log.txt");
console.log(filePath);

// ✅ Append the input to the file asynchronously
fs.appendFile(filePath, inputArguments, "utf-8", (error) => {
  if (error) {
    throw Error("Append error", error);
  }
  console.log("Arguments appended successfully");
});

// console.log(inputArguments);
