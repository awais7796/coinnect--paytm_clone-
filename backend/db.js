const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://awaitzz49:Demo123@cluster0.blhgy.mongodb.net/paytm_clone");


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLenght:6,
        maxLenght:8

    },
    password:{
        type:String,
        required:true,
        unique:true,
        minLenght:6

    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLenght:6
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLenght:6
    }
})
const User=mongoose.model('User',userSchema);
module.exports={
    User}