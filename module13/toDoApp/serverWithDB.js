const http = require("http");
const path = require("path");
const fs = require("fs");
const { json } = require("stream/consumers");

const filepath = path.join(__dirname, "./db/todos.json");

const server = http.createServer((req, res) => {
  const { method } = req;
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );
  // GET -- All the todos
  if (pathname === "/todos" && method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });

    fs.readFile(filepath, "utf-8", (error, data) => {
      if (error) {
        res.end(
          JSON.stringify({
            statusCode: 500,
            message: "Something went wrong!",
          })
        );
      } else {
        res.end(
          JSON.stringify({
            data: JSON.parse(data),
            statusCode: 200,
            message: "All todos fetched successfully.",
          })
        );
      }
    });
  }
  // POST -- Create a new todo
  else if (pathname === "/create-todo" && method === "POST") {
    res.writeHead(201, {
      "content-type": "application/json",
    });
    req.on("data", (chunk) => {
      fs.readFile(filepath, { encoding: "utf-8" }, (error, data) => {
        if (error) {
          res.end(
            JSON.stringify({
              statusCode: 500,
              message: "Something went wrong!",
            })
          );
        } else {
          const newTodo = JSON.parse(chunk);
          const timeStamp = new Date().toLocaleString();
          const newTodoWithTimeStamp = {
            ...newTodo,
            createdAt: timeStamp,
          };
          const parseData = JSON.parse(data);

          const isExist =
            parseData?.length &&
            parseData.some(
              (todo) => todo.title.toLowerCase() === newTodo.title.toLowerCase()
            );

          if (!isExist) {
            parseData.push(newTodoWithTimeStamp);
            fs.writeFile(
              filepath,
              JSON.stringify(parseData),
              "utf-8",
              (error) => {
                if (error) {
                  res.end(
                    JSON.stringify({
                      statusCode: 500,
                      message: "Something went wrong!",
                    })
                  );
                } else {
                  res.end(
                    JSON.stringify({
                      statusCode: 201,
                      message: "Todo created successfully.",
                      data: newTodoWithTimeStamp,
                    })
                  );
                }
              }
            );
          } else {
            res.end(
              JSON.stringify({
                statusCode: 403,
                message: "Todo already exist",
              })
            );
          }
        }
      });
    });
  }
  // PUT -- Update the selected todo
  else if (pathname === "/update-todo" && method === "PUT") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    req.on("data", (chunk) => {
      fs.readFile(filepath, { encoding: "utf-8" }, (error, data) => {
        if (error) {
          res.end(
            JSON.stringify({
              statusCode: 500,
              message: "Something went wrong!",
            })
          );
        } else {
          const updateTodo = JSON.parse(chunk);
          const parseData = JSON.parse(data);
          const param = searchParams.get("title").toLowerCase();

          const perviousTodo =
            parseData?.length &&
            parseData.find((todo) => todo.title.toLowerCase() === param);

          if (perviousTodo) {
            const updateAllData = parseData.map((todo) =>
              todo.title.toLowerCase() === param
                ? {
                    ...todo,
                    title: updateTodo.title,
                    body: updateTodo.body,
                  }
                : todo
            );
            fs.writeFile(
              filepath,
              JSON.stringify(updateAllData),
              "utf-8",
              (error) => {
                if (error) {
                  res.end(
                    JSON.stringify({
                      statusCode: 500,
                      message: "Something went wrong!",
                    })
                  );
                } else {
                  res.end(
                    JSON.stringify({
                      statusCode: 200,
                      message: "Todo updated successfully.",
                      data: {
                        ...updateTodo,
                        createdAt: perviousTodo.createdAt,
                      },
                    })
                  );
                }
              }
            );
          } else {
            res.end(
              JSON.stringify({
                statusCode: 403,
                message: "Todo doesn't exist",
              })
            );
          }
        }
      });
    });
  }
  // DELETE -- Delete selected todo
  else if (pathname === "/delete-todo" && method === "DELETE") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    fs.readFile(filepath, { encoding: "utf-8" }, (error, data) => {
      if (error) {
        res.end(
          JSON.stringify({
            statusCode: 500,
            message: "Something went wrong!",
          })
        );
      } else {
        const parseData = JSON.parse(data);
        const param = searchParams.get("title").toLowerCase();

        const isExist =
          parseData?.length &&
          parseData.some((todo) => todo.title.toLowerCase() === param);

        if (isExist) {
          const updateAllData = parseData.filter(
            (todo) => todo.title.toLowerCase() !== param
          );
          fs.writeFile(
            filepath,
            JSON.stringify(updateAllData),
            "utf-8",
            (error) => {
              if (error) {
                res.end(
                  JSON.stringify({
                    statusCode: 500,
                    message: "Something went wrong!",
                  })
                );
              } else {
                res.end(
                  JSON.stringify({
                    statusCode: 200,
                    message: "Todo deleted successfully.",
                  })
                );
              }
            }
          );
        } else {
          res.end(
            JSON.stringify({
              statusCode: 403,
              message: "Todo doesn't exist",
            })
          );
        }
      }
    });
  }
  // GET -- Get single todo
  else if (pathname === "/todo" && method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    fs.readFile(filepath, { encoding: "utf-8" }, (error, data) => {
      if (error) {
        res.end(
          JSON.stringify({
            statusCode: 500,
            message: "Something went wrong!",
          })
        );
      } else {
        const parseData = JSON.parse(data);
        const param = searchParams.get("title").toLowerCase();

        const isExist =
          parseData?.length &&
          parseData.some((todo) => todo.title.toLowerCase() === param);

        if (isExist) {
          const singleTodo = parseData.find(
            (todo) => todo.title.toLowerCase() === param
          );
          res.end(
            JSON.stringify({
              statusCode: 200,
              message: "Todo fetched successfully.",
              data: singleTodo,
            })
          );
        } else {
          res.end(
            JSON.stringify({
              statusCode: 403,
              message: "Todo doesn't exist",
            })
          );
        }
      }
    });
  } else {
    res.end("Route not found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is listening with port");
});
