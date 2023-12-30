const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let connectedUsers = [];

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("send-data", (message) => {
    console.log("Received message:", message);
    io.emit("get-message", message);
  });

  socket.on("connect-to-random-user", () => {
    console.log(`User ${socket.id} requested to connect to a random user`);

    // Find a random user to connect to
    const randomUser = connectedUsers.find((user) => user.id !== socket.id);

    if (randomUser) {
      console.log(`Connecting ${socket.id} to ${randomUser.id}`);

      // Notify both users that they are connected
      io.to(socket.id).emit("connected-to-random-user", randomUser);
      io.to(randomUser.id).emit("connected-to-random-user", {
        id: socket.id,
        name: "Random User", // Add any additional user information
      });
    } else {
      console.log(`No random user available for ${socket.id}`);

      // Handle the case where no random user is available
      io.to(socket.id).emit("no-random-user-available");
    }
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);

    // Remove the disconnected user from the connectedUsers array
    connectedUsers = connectedUsers.filter((user) => user.id !== socket.id);
  });

  // Add the connected user to the array when they connect
  connectedUsers.push({ id: socket.id });
});

server.listen(5000, () => console.log("server is running at 5000"));
