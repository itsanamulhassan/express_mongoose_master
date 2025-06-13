"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./app/todos/todos.routes");
// const filepath = path.join(__dirname, "../db/todos.json");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/todo", todos_routes_1.todoRouter);
exports.default = app;
