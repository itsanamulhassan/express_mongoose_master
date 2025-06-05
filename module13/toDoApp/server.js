const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url.slice(1),
    method = req.method;
  console.log(url);
  if (method === "PATCH" && url === "update-todo") {
    res.end("Todo updated successfully");
  }
  if (method === "GET" && url === "todos") {
    res.end("Todos fetched successfully");
  }
  //   res.end("Welcome to ToDo App Server");
});
server.listen(5000, "127.0.0.1", () => {
  console.log("✅ Server listening on port 5000");
});
