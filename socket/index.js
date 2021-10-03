const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000"
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
    //console.log(userId);
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    //console.log(userId);
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("A user connected");
    io.emit("Welcome", "Hello this is socket server ");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);

        try {
            io.to(user.socketId).emit("getMessage", {
            senderId,
            text
            });
        } catch (err) {
            console.log('One of the user is not connected');
        }
        // console.log(receiverId.socketId);
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});