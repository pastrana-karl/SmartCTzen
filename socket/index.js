const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    },
});

let users = [];

io.on("connection", (socket) => {
    console.log("A user connected");
    io.emit("Welcome", "Hello this is socket server ");
    //take userId and socketId from user
});