import mongoose from "mongoose";
import Blog from "../schema/BlogSchema";
import User from "../schema/signupSchema";

export const getAllBlogs = async (req,res, next)=>{
    let blogs;
    try{
        blogs = await Blog.find().populate("user");
    }catch(err){
        return console.log(err);
    }
    if (!blogs){
        return res.status(404).json({message:"No Blogs Found"});
    }
    return res.status(200).json({blogs});
}

export const addBlog = async(req,res,next)=>{
    const {image,title,description,authername} = req.body;

    let already_a_user;
    try{
        already_a_user = await User.findById(authername);
    }catch(err){
        return console.log(err);
    }
    if (!already_a_user){
        return res.status(400).json({message:"Unable to find user"})
    }
    const blog = new Blog({
        image,
        title,
        description,
        authername
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        already_a_user.blogs.push(blog);
        await already_a_user.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err})
    }

    return res.status(200).json(blog);
};

export const updateBlog = async (req, res, next)=>{
    const {title, description}=req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        });
    }catch (err){
        return console.log(err);
    }
    if (!blog){
        return res.status(500).json({message:"Unable to update"});
    }
    return res.status(200).json({blog});
};

export const getById = async (req,res, next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id);
    }catch(err){
        return console.log(err);
    }
    if (!blog){
        return res.status(404).json({message:"No Blog Found"});
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async(req,res,next)=>{
    const id = req.params.id;
     
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if (!blog){
        return res.status(500).json({message:"Cannot Delete"});
    };
    return res.status(200).json({message:"Dleted Successfully"});
};

export const getByUserId = async(req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        return console.log(err);
    }
    if (!userBlogs){
        return res.status(404).json({message:"No Blogs"})
    }
    return res.status(200).json({user:userBlogs})
};