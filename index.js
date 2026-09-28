require("dotenv").config();
const express=require('express');
const dbConnection=require('./src/config/dbcon');

const app=express();

//db conect
dbConnection();

//create a json
app.use(express.json());

//jobportal Router
const jobRoute=require('./src/router/job.router');

app.use("/api", jobRoute);

const port =process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is running ${port}`)
})

































