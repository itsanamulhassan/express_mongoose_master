"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.join(__dirname, "../db/todos.json");
exports.todosRouter = express_1.default.Router();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", exports.todosRouter);
app.get("/", (req, res) => {
    res.send("Welcome to ToDos App ");
});
exports.todosRouter.get("/todos", (req, res) => {
    const data = fs_1.default.readFileSync(filepath, "utf-8");
    res.json({
        message: "Fetched todos",
        data,
    });
});
app.post("/create-todo", (req, res) => {
    console.log(req.body);
});
app.get("/todo/:id", (req, res) => {
    console.log("query", req.query);
    console.log("param", req.params);
    // console.log(req.body);
});
exports.default = app;
