const fs = require("fs");

const readStream = fs.createReadStream("./module13/read.txt", {
  encoding: "utf-8",
});
const writeStream = fs.createWriteStream("./module13/write.txt", {
  encoding: "utf-8",
});

readStream.on("data", (data) => {
  //   console.log(data);
  writeStream.write(data, (error) => {
    if (error) {
      throw Error("Error", error);
    }
  });
});

readStream.on("error", (error) => {
  if (error) {
    throw Error("Error", error);
  }
});
writeStream.write("error", (error) => {
  if (error) {
    throw Error("Error", error);
  }
});

readStream.on("end", () => {
  console.log("Reading ended");
  writeStream.end();
});
