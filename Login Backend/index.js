const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
app.use(cors())


app.use(express.json())

const port = process.env.PORT||8080

const connect = ()=>{
    return mongoose.connect("mongodb+srv://prashant:prashant_123@cluster0.t0p0k.mongodb.net/login?retryWrites=true&w=majority")
}
const userSchema = new mongoose.Schema({
    email:{type:String},
    first_name:{type:String},
    last_name:{type:String},
    password:{type:String},
    date_of_birth:{type:String}
})

let User;
try{
    User = mongoose.model("user",userSchema)
}catch(e){
    console.log(e.message);

}
app.post("/users",async (req,res)=>{
    try{
        const user = await User.create(req.body);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.send(user)
    }
    catch(e){
        console.log(e.message)
    }
})

app.get("/users",async(req,res)=>{
    const users = await User.find().lean().exec();
    res.send(users)
})

app.listen(port,async function (){
    try{
        await connect();
        console.log("listening on port 8080")
    }
    catch(e){
        console.log(e.message)

    }
})