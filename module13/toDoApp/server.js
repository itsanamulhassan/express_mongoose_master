const http = require("http");

const sampleJSONData = [
  {
    title: "Prisma",
    body: "Learning Node.js",
    createdAt: "5/18/2025, 1:25:02 AM",
  },
  {
    title: "TypeScript",
    body: "Learning Node.js",
    createdAt: "5/18/2025, 2:25:02 AM",
  },
];

const server = http.createServer((req, res) => {
  const url = req.url.slice(1),
    method = req.method;

  // res.setHeader("content-type", "text/plain");
  // res.setHeader("email", "ah2@gmail.com");
  // res.statusCode = 200;
  // console.log(url);
  if (method === "PATCH" && url === "update-todo") {
    res.end("Todo updated successfully");
  }
  if (method === "GET" && url === "todos") {
    res.writeHead(200, {
      // "content-type": "text/plain",
      // "content-type": "application/json",
      "content-type": "text/html",
      email: "ah@mail.com",
    });
    // res.end(JSON.stringify(sampleJSONData));
    res.end(`<h1>Hello World</h1> <h2>Hello World</h2> <h3>Hello World</h3>`);
  }
  //   res.end("Welcome to ToDo App Server");
});
server.listen(5000, "127.0.0.1", () => {
  console.log("✅ Server listening on port 5000");
});
