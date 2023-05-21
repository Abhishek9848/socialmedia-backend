const Post = require('../model/post')

exports.createPost =async (req, res, next)=>{
    try{
        const post = await new Post(req.body).save()
        res.json(post)
    }catch(error){
        next(error)
    }
}
exports.getPostsById =async (req, res, next)=>{
    try{
        const posts = await Post.find({user:req.user.id})
        res.json(posts)
    }catch(error){
        next(error)
    }
}
