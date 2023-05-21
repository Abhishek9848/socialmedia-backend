const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const PostSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['profilePicture', 'cover', null],
        default:null
    },
    text:String,
    images:Array,
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    background:String,
    comments:[
        {
            comment:String,
            image:String,
            commentBy:{
                type:ObjectId,
                ref:"User",
            },
            commentAt:{
                type:Date,
                default:new Date()
            }
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Post' , PostSchema)