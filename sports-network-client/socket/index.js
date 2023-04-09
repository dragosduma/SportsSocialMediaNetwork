import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    },
});

let onlineUsers = [];

//from the client side the whole token is send. in order to use only the email, do user.sub/senderName.sub/receiverName.sub

const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.sub === username) &&
        onlineUsers.push({ username, socketId });
};

// const removeUser = (socketId) => {
//     onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
        addNewUser(username.sub, socket.id);
    });

    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getNotification", {
            senderName: senderName.sub.split("@")[0],
            type,
        });
    });

});

io.listen(5000);