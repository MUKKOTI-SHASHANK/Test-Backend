import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from "../contorllers/blog_controller";

const blogRuter = express.Router();

blogRuter.get("/",getAllBlogs);
blogRuter.post("/add",addBlog);
blogRuter.put("/update/:id",updateBlog);
blogRuter.get("/:id",getById);
blogRuter.delete(":id",deleteBlog);
blogRuter.get("/user/:id", getByUserId);

export  default blogRuter;
