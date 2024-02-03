const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://adarsh:Adarsh%4054321@cluster0.o25mqzc.mongodb.net/Csale");
const AdminSchema= new mongoose.Schema({
    username:String,
    password: String,
});

const UserSchema=new mongoose.Schema({
    username: String,
    password: String,
    purchasedCouses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const CourseSchema= new mongoose.Schema({
    title:String,
    description: String,
    imageLink: String,
    price: Number,
})

const Admin= mongoose.model('Admin',AdminSchema);
const User= mongoose.model('User',UserSchema);
const Course=mongoose.model('Course',CourseSchema);


module.exports={
    Admin,
    User,
    Course
}