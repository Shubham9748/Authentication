const mongoose = require('mongoose');


const DB= process.env.DATABASE;

// mongoose.connect(DB,{
//     useNewUrlParser : true,
//     useUnifiedTopology : true,
//     //useCreateIndex: true,
//     //useFindAndModify: false,
// }).then(()=>{
//     console.log("Connect to DB");
// }).catch((err)=>{
//     console.log("error connecting to DB");
// })


const connectToDb=async()=> {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the DB");
  } catch (err) {
    console.error(`Error connecting to the DB:  ${err}`);
  }
}

connectToDb();
