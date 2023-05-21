const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const User = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        trim:true,
        text:true
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"],
        trim:true,
        text:true
    },
    userName:{
        type:String,
        required:[true,"User name is required"],
        trim:true,
        text:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    picture:{
        type:String,
        trim:true,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    cover:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        required:[true,"Gender is required"]
    },
    bYear:{
        type:String,
        required:true,
        trim:true
    },
    bMonth:{
        type:String,
        required:true,
        trim:true
    },
    bDay:{
        type:String,
        required:true,
        trim:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    friends:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    },
    requests:{
        type:Array,
        default:[]
    },
    search:[
        {
            user:{
                type:ObjectId,
                ref:"User"
            }
        }
    ],
    details:{
        bio:String,
        otherName:String,
        job:String,
        workPlace:String,
        highSchool:String,
        college:String,
        currentCity:String,
        hometown:String,
        relationship:String,
        instagram:String
    },
    savedPosts:[
        {
            post:{
                type:ObjectId,
                ref:"Post"
            },
            savedAt:{
                type:Date,
                default: new Date(),
            }
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("User" , User)