import { Server } from "http";
require("dotenv").config();
import mongoose from "mongoose";
import app from "./app";
let server: Server;

const uri: string = `mongodb+srv://${process.env.NOTE_APP_MONGODB_USER}:${process.env.NOTE_APP_MONGODB_PASSWORD}@freecluster.ghcns1s.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FreeCluster`;

async function main() {
  try {
    await mongoose.connect(uri);
    console.log(uri);
    server = app.listen(process.env.PORT, () => {
      console.log("App is listening on port ", process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
