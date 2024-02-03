const express=require("express");
const bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const user=require("../class3/routes/user");
const admin=require("../class3/routes/admin");
app.use(bodyParser.json());
app.use('/user',user);
app.use('/admin',admin);

app.get("/",(req,res)=>{
    res.send("<h1>HOMEPAGE</h1>");
})

app.listen(3000,()=>{console.log("Server is ruuning")});