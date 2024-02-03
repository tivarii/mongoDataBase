const { Admin }=require("../db/db");

async function adminMiddleware(req,res,next){
    const username=req.header.username;
    const password=req.header.password;
    const response=await Admin.findOne({
        username:username,
        password:password
    });
    if(response) next();
    else{
        res.status(403).json({
            msg: "User doesn't exist"
        });
    }
}

module.exports=adminMiddleware;