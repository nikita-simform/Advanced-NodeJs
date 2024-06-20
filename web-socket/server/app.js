import cors from "cors";
import express from "express";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

const PORT = 5000;
const SECRET_KEY = "nikita"

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.emit("welcome", "Welcome to the server") //will emit msg to all connected socket
  // socket.broadcast.emit("welcome", `${socket.id} joined to the server`) //will emit msg to other socket except the one that is connected

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`)
  })

  socket.on("message", (data) => {
    console.log("message", data);
    // io.emit("receive-message", data)
    if (data.room) {
      socket.broadcast.to(data.room).emit("receive-message", data)
    } else {
      socket.broadcast.emit("receive-message", data)
    }
    // io.to(data.room).emit("receive-message", data) // will emit msg to particular room
  })

  socket.on("join-room", (room) => {
    console.log(`${socket.id} joined room`, room)
    socket.join(room)
  })
})

app.use(cors());

//socket middleware
// io.use((socket, next) => {
//   cookieParser()(socket.request, socket.request.res, (err) => {
//     if (err) return next(err);
//     //Authentication with socket
//     const token = socket.request.cookies.token;
//     if (!token) return (new Error("Authentication Error"))
//     const decoded = jwt.verify(token, SECRET_KEY);
//     next();
//   })

// })

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "test" }, SECRET_KEY);
  res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" }).json({ message: "Login Success" })

})

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})