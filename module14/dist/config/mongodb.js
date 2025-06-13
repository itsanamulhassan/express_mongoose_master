"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongodb_1 = require("mongodb");
const uri = `mongodb+srv://${process.env.MODULE14_MONGODB_USERNAME}:${process.env.MODULE14_MONGODB_PASSWORD}@module14.ythvohv.mongodb.net/?retryWrites=true&w=majority&appName=Module14`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
exports.default = client;
