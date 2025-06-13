"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("../../config/mongodb"));
const mongodb_2 = require("mongodb");
exports.todoRouter = express_1.default.Router();
exports.todoRouter.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.default.db("todoAppDB");
    const collection = yield db.collection("todos").insertOne(req.body);
    res.send({
        message: "Todo created successfully",
        data: collection,
    });
}));
exports.todoRouter.get("/all-todos", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.default.db("todoAppDB");
    const collection = yield db.collection("todos");
    const cursor = collection.find({});
    const todos = yield cursor.toArray();
    res.send({
        message: "All todos fetched successfully",
        data: todos,
    });
}));
exports.todoRouter.get("/single-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.default.db("todoAppDB");
    const collection = yield db.collection("todos");
    const cursor = yield collection.findOne({ _id: new mongodb_2.ObjectId(req.params.id) });
    res.send({
        message: "Single todo fetched successfully",
        data: cursor,
    });
}));
exports.todoRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.default.db("todoAppDB");
    const collection = yield db.collection("todos");
    const cursor = yield collection.deleteOne({
        _id: new mongodb_2.ObjectId(req.params.id),
    });
    res.send({
        message: "Todo deleted successfully",
        data: cursor,
    });
}));
exports.todoRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.default.db("todoAppDB");
    const collection = yield db.collection("todos");
    const updateData = req.body;
    const cursor = yield collection.updateOne({
        _id: new mongodb_2.ObjectId(req.params.id),
    }, { $set: updateData }, { upsert: true });
    res.send({
        message: "Todo updated successfully",
        data: cursor,
    });
}));
