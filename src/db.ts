import pkg from 'mongoose';
import { config } from "dotenv";
config();
const { connection, connect } = pkg;
connection.on("connected", function () {
  console.log("Mongoose connected to Server");
});
connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});
connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
export const mongoose = await connect(process.env?.DBURL ?? "");

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = function (msg: any, callback: any) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

// For nodemon restarts
process.once("SIGUSR2", function () {
  gracefulShutdown("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});

// For app termination
process.on("SIGINT", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
});

// For Server app termination
process.on("SIGTERM", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
});