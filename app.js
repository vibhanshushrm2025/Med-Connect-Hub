import express from "express";
import userrouter from "./routes/user.js";
import adminrouter from "./routes/admin.js";
import { connectDb } from "./data/database.js";
import cookieParser from "cookie-parser"
import cors from "cors";
import {config} from "dotenv";
import { errorHandle } from "./middlewares/error.js";
                                
    
const app = express();
config({
    path:"./config.env"
})
connectDb();
app.use(cookieParser());
app.use(cors({
    // origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true

}));
app.use(express.json());

app.use("/api/v1/users",userrouter);
app.use("/api/v1/admin",adminrouter);


app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT} port in ${process.env.NODE_ENV} mode`);
})

app.use(errorHandle);
