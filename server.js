const { default: bcrypt } = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("./users");

const app = express();
app.use(express.json());


const SECRET_KEY = "mysecretkey";

app.post("/login",(req,res)=>{
    const{ username,password }=req.body;

    const user = users.find(u=>u.username===username);

    if(!user){
        return res.status(401).json({message:"User not found"});
    }

    const isValid = bcrypt.compareSync(password,user.password);

    if(!isValid){
        return res.status(401).json({message:"Wrong Password"});
    }

    const token = jwt.sign(
        {
            userId: user.id,role:user.role
        },
        SECRET_KEY,
        { expiresIn: "1hr"}
    );

    res.json({token});
})
app.get("/",(req,res)=>{
    res.send("Server is Running");
});

app.listen(3000,()=>{
    console.log("Server is Running on port 3000");
})