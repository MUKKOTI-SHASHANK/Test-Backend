import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema =  new Schema({
    image:{type:String, required:true},
    title:{type:String, required:true},
    description:{type:String, required:true},
    authername:{type:String, required:true},
    // date:{type:Date.now()}
})

export default mongoose.model("Blog", blogSchema)