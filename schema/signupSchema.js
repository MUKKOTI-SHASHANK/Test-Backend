import mongoose from "mongoose";

const Schema= mongoose.Schema;

const SignupSchema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:8},
    confirmpassword:{type:String,  required:true, minlength:8},
    // blogs:[{type:mongoose.Types.ObjectId, ref:"Blog", require:true}]
})

export default mongoose.model("User", SignupSchema);