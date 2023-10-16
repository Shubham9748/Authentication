const express= require('express');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const cookie = require('cookie');
const router=express.Router();
require('../db/connectDB');
const User=require('../model/userSchema');

router.get('/',(req,res)=>{
    res.send(`hello Router`)
});
// router.post('/register',(req,res)=>{
//     // console.log(req.body);
//     // res.json({message:req.body});
//     // using promises

//     // get data
//     const {name, email, phone,password,work,cpassword}= req.body;
//     // check validation
//     if(!email || !phone||!password||!work||!name||!cpassword)
//     {
//         return res.status(422).json({error:"please fill all the fields"});
//     }
//     //    checking password and confirm password are same or not
//     User.findOne({$or :[{email: email}, {phone: phone}]})
//     .then((userExist)=>{
//         if(userExist){
//             let duplicateField= userExisst.email=== email? "Email": "Phone";
//             return res.status(422).json({error:`${duplicateField} already registered`});
//         }
//         const user =new User({name,email,phone,password,work,cpassword});
//         user.save().then(()=>{
//             res.status(201).json({message:"User Resitered Succesfully"});
//         }).catch((err)=>res.status(500).json({error:"Failed To Regsiter"}))
//     }).catch(err=>{
//         console.log(err);
//     })

// })
  

router.post('/register', async(req, res) => {
    const {name, email, phone, password, work, cpassword} = req.body;

    if(!name || !email || !phone || !password || !work || !cpassword)
    {
        return res.status(422).json({error: "Please fill the field properly"});
    }

    try {
        const userExist = await User.findOne({$or: [{ email: email }, { phone: phone }]});

        if(userExist) 
        {
            let duplicateField = userExist.email === email ? "Email" : "Phone";
            return res.status(422).json({error: `${duplicateField} Already Registered`});
        }
        else if (password != cpassword) {
            return res.status(422).json({ error:"Passwords do not match!" });
        }
        else{
            const user = new User({name, email, phone, password, work, cpassword});

            const userRegister = await user.save();

            if(userRegister){
                res.status(201).json({message: "User Registered Successfully"});
            }
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/signin',async(req,res)=>{
    try{
        const {email, password}=req.body;
        //validation
        if (!email||!password ){
            return res.status(422).json({error:'please provide all fields'})
        }
        //check email and password
        const userLogin= await User.findOne({email:email});
        
        if(userLogin){
            const isMatch= bcrypt.compare(password,userLogin.password);
            const token= await userLogin.generateAuthToken();
            //console.log(token);
            //store in cookie
            res.cookie("jwtoken",token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly: true
            });
            if(!isMatch){
                res.status(400).json({error:"Invalid password"})
            }else{
                res.status(200).json({message:"user signin succesfully"});
            }
            // res.status(400).json({error:"user does not exist"});
        }
        else{
            res.status(200).json({message:"Invalid email"});
        }
    }catch(error){
        console.log(`${error}`)
    }
})

module.exports= router;