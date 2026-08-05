const express= require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI =process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes')

app.use('/api/auth' , authRoutes);
app.use('/api' , courseRoutes);

app.get('/api/health' , (req ,res) =>{
res.json({status:"ok"});
})


mongoose.connect(MONGO_URI).then(()=>{
 app.listen(PORT ,()=>{
  console.log("Server is RUNNING")
})
}).catch((error)=>{
  console.log("Error Occured" , error);
})

