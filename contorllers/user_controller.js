import User from "../schema/signupSchema";
import bcrypt from "bcrypt";
// const bcrypt = require("bcrypt")

export const getAllUser = async(req, res, next)=>{
    let users;
    try{
        users=await User.find();
    } catch(err){
         return console.log(err);
    }
    if (!users){
        return res.status(404).json({
            message:"No User Found"
        })
    }
    return res.status(200).json({users});
}

export const signup = async(req,res,next)=>{
    const {email,password,confirmpassword}=req.body;
    let already_a_user;
    try{
        already_a_user = await User.findOne({email})
    } catch(err){
        return console.log(err);
    }
    if (already_a_user){
        return res.status(400).json({
            message:"User Already Exists! you don't need to SignUp. you can go to Login"
        })
    }
    if (password!=confirmpassword){
        return res.status(400).json({
                    message:"password not matching"
                })   
    }
    const hashedpassword = bcrypt.hashSync(password,10);
    const hashedconfimpassword = bcrypt.hashSync(confirmpassword,10);
    

    // if (hashedpassword!=hashedconfimpassword){
    //     return res.status(400).json({
    //         message:"password not matching"
    //     })
    // }

    const user = new User({
        email,
        password:hashedpassword,
        confirmpassword:hashedconfimpassword,
        blogs:[],
    });

    try{
        await user.save();
    } catch(err){
        return console.log(err);
    }
    return res.status(201).json({user});
};

export const login= async(req,res,next)=>{
    const {email,password}= req.body;
    let already_a_user;
    try{
        already_a_user = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if (!already_a_user){
        return res.status(404).json({message:"User not found"});
    }
    const passwordcheck= bcrypt.compareSync(password, already_a_user.password);
    if (!passwordcheck){
        return res.status(400).json({
            message:"Invalid  credentials",
        })
    }
    return res.status(200).json({
        message:"Login Successful"
    })
}
