import {Server} from "socket.io";
import express from "express";
import http from "http";
import { log } from "console";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET","POST"]
    }
});

const userSocketMap = {} ;// this map store socket id corresponding the user id ; userId -> socketIs;

export const getReceiverSockeId = (receiverId) => userSocketMap[receiverId]; 
 

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id
        console.log(`User connected : userId = ${userId} socket id ${socket.id}`);
        
    }
   io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        if(userId){
            console.log(`User disconnected : userId = ${userId} socket id ${socket.id}`);
            delete userSocketMap[userId]
        }
     io.emit("getOnlineUsers",Object.keys(userSocketMap));

    });
})


export {app,server,io}