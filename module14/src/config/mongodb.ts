require("dotenv").config();
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MODULE14_MONGODB_USERNAME}:${process.env.MODULE14_MONGODB_PASSWORD}@module14.ythvohv.mongodb.net/?retryWrites=true&w=majority&appName=Module14`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
