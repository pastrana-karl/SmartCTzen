const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000"
    },
});

let users = [];

const addUser = (userId, socketId) => {
    // console.log("This is from addUser sender user: ",userId)
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
    //console.log(userId);
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    const test = users.find((user) => user.userId === userId);
    
    // console.log("This is from getUser",test)
    //yung nasa baba array from kausap yung user id nila tapos yung socket id kung saan kayo nag uusap
    // console.log("Trying to get users ", users) 
    //ito yung id mo
    // console.log("Trying to get sender, if not the same with previous sender, one of the users dced: ", userId)
    //kaya magkaiba ng userid sa userid ng users kasi ibang tao
    //Refresh page for both users when making edits to this page
    return test
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
        // console.log("This is from sendMessage recieverId: ",receiverId);
        // console.log(user);
        try{//Will send an error to console but does not disrupt running of application
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        });
        console.log("This is from sendMessage",text)
        }catch(err){
            console.log("One of the users are not connected")
        }
    });
    

    //when disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});