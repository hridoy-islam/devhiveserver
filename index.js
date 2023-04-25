const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const UserRoute = require("./Routes/UserRoute");
const ServicesRoute = require("./Routes/ServicesRoute");
const CategoryRoute = require("./Routes/CategoryRoute");
const AdminRoute = require("./Routes/AdminRoute");
const ChatRoute = require("./Routes/ChatRoute");
// const MessageRoute = require("./Routes/MessageRoute");
const bodyParser = require("body-parser");
const { swaggerServe, swaggerSetup } = require("./Swagger-code/specs.js");
const { notFound, errorHandler } = require("./middleware/errMiddleWare");

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// getting-started.js

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.use("/user", UserRoute);
app.use("/service", ServicesRoute);
app.use("/category", CategoryRoute);
app.use("/admin", AdminRoute);
app.use("/chat", ChatRoute);
// app.use("/message", MessageRoute);
app.use("/", swaggerServe, swaggerSetup);
app.use("/api-docs", swaggerServe, swaggerSetup);
// new route for chat here
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Devhive is running: ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", (userData) => {
    console.log("user Disconnected");
    socket.leave(userData._id);
  });
});
