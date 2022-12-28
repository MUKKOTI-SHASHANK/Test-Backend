import express from "express";
import  mongoose from "mongoose";
import router from "./routes/loginRoutes";
import blogRuter from "./routes/blogRoutes";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", router);
app.use("/blog",blogRuter);
mongoose.connect("mongodb+srv://root:10xaca@cluster0.6tj95nx.mongodb.net/blog?retryWrites=true&w=majority")
.then(()=>app.listen (5000))
.then(()=> console.log("connected to DB at 5000 port"))
.catch((err)=> console.log(err));