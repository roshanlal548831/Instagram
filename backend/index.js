import  configDotenv  from 'dotenv';
configDotenv.config()


import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from './utils/db.js';


const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

const corsOption = {
    origin:"http//localhost:3000",
    credentials:true
}
app.use(cors(cookieParser))

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    connectDB()
    console.log(`server run 8000 ${port}`)
})