const express=require("express");
const router=express.Router();

const{ User , Course }=require("../db/db");
const userMiddleware=require("../middleware/user");

router.post('/signup',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const value=await User.findOne({
        username,
        password
    });
    if(value){
        res.json({
            msg:"User is already present",
        })
    }else{
        User.create({
            username,
            password
        }).then(()=>{
            res.json({
                msg:"User created successfully"
            });
        }).catch(()=>{
            res.status(503).json({
                msg:"Some internal error"
            })
        })
    }
})

router.get('/courses',async (req,res)=>{
    const courses= await Course.find({});
    res.json({
        Courses:courses,
    })
})

router.post('/courses/:courseId', userMiddleware,async(req,res)=>{
    const id=req.params.courseId;
    const username=req.headers.username;
    await User.updateOne({
        username,
    },{
        "$push":{
            purchasedCouses:id,
        }
    });
    res.json({
        msg:"Course added successfuly",
    })
})

router.get('/puchasedCourses',userMiddleware,async (req,res)=>{
    const user=User.findOne({
        username: req.headers.username
    });
    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCouses
        }
    })
})

module.exports={router};