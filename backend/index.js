import  configDotenv  from 'dotenv';
configDotenv.config();


import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { connectDB } from './utils/db.js';
import router from './router/userRoute.js';
import postRoute from "./router/postRouter.js"
import messageRoute from "./router/messageRoute.js"
import { app,server } from './shocket/sockt.js';
import path from "path";



const port = process.env.PORT || 3000;

const __dirname = path.resolve()

app.use(cookieParser())

const corsOption = {
    origin:"http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAF",
    credentials: true
}

app.use(cors(corsOption));




app.use("/api/v1/user",router);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);
app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})

server.listen(port,()=>{
    connectDB()
    console.log(`server run 8000 ${port}`)
})