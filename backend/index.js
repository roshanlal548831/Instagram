import  configDotenv  from 'dotenv';
configDotenv.config();


import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from './utils/db.js';
import router from './router/userRoute.js';


const app = express();
const port = process.env.PORT || 3000

app.use(cookieParser())

const corsOption = {
    origin:"http//localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAF",
    credentials:true
}
app.use(cors(corsOption));



app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/api/v1/user",router)

app.listen(port,()=>{
    connectDB()
    console.log(`server run 8000 ${port}`)
})