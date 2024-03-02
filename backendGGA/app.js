const express = require("express");
const app=express();
const cors = require('cors');

const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload= require("express-fileupload");
const errorMiddleware= require("./middleware/error");

//config
if(process.env.NODE_ENV!="PRODUCTION"){
    require("dotenv").config({path:"./config/config.env"})
}
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000','https://65e2fbec619af49e96102ed0--shopeeeewebtech.netlify.app/'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

//route imports
const product= require("./routes/productRoute");
const user =require("./routes/userRoute");
const contact=require("./routes/contactRoute");



app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", contact);


app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'bad request'
    })
  })
app.use(errorMiddleware);

module.exports=app;