const express=require("express");
const adminMiddleware=require("../middleware/admin");
const { Admin, Course }=require("../db/db");
const router=express.Router();

router.post('/signup',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const response=Admin.findOne({
        username:username,
        password:password,
    });
    if(response){
        res.json({
            msg:"Username is already exist"
        })
    }else{
        Admin.create({
            username:username,
            password:password
        }).then(function(){
            res.json({
                msg:"Admin created successfully"
            })
        }).catch(function(){
            res.status(503).json({
                msg:"Admin doesn't created. Some internal error!"
            })
        })
    }
})


router.post("/courses",adminMiddleware,(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;
    Course.create({
        title,
        description,
        imageLink,
        price
    }).then((newCourse)=>{
        res.json({
            msg: "Course Created Succesfully",
            courseId: newCourse._id
        });
    }).catch((e)=>{
        res.status(503).json({
            errro:e,
            msg:"some intrnal error"
        });
    })

})

router.get('/courses',adminMiddleware,async (req,res)=>{
    Course.find({}).then((value)=>
    {
        res.json({
            Courses:value,
        })
    })

})

module.exports={router};