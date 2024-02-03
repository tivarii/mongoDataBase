const {User}=require("../db/db");

async function userMiddleware(req,res, next){
    const username=req.body.username;
    const password=req.body.password;
    const value=await User.findOne({
        username:username,
        password:password,
    });
    if(value) next();
    else{
        res.status(403).json({
            msg:"User doesn't exist",
        })
    }
}

module.exports=userMiddleware;