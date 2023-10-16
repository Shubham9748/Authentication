//require express
const  express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//create a variable to access methods an properties
const  app=express();

const PORT=process.env.PORT;


require('./db/connectDB');
app.use(express.json());

app.use(require('./routes/auth'));


const middleware=(req,res,next)=>{
    console.log(`middleware`);
    next();
}

//app.get(path,callback)
app.get('/',(req,res)=>{
    res.send(`Hello World!`)
});
app.get('/about',middleware,(req,res)=>{
    res.send(`About`)
});
app.get('/contact',(req,res)=>{
    res.send(`Contact`)
});
app.get('/signup',(req,res)=>{
    res.send(`SignUp!`)
});
app.get('/signin',(req,res)=>{
    res.send(`SignIn!`)
});

//create a server using listen method
app.listen(PORT , ()=>{
    console.log(`Server is running on port: ${PORT}`)
});