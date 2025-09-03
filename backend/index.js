const express = require("express");
const cors=require("cors")
const app=express();
const   PORT=3000

app.use(express.json());
//importing router 
const rootRouter=require("./router/index.js")
const userRouter=require("./router/user.router.js")

app.use(cors());



//routing 
app.use("/api/v1",rootRouter);
app.use("/api/v1/user",userRouter);


app.listen(PORT,(req,res)=>{
    console.log(`server is running on post ${PORT}`);
    
})

