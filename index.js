const express=require('express')
const app=express()
const mongoose=require('mongoose')
const route=require('./src/route/route')

require('dotenv').config();
const {PORT,MONGODB_URL}=process.env
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// process.env.MONGODB_URL
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log("Connected to DB successfully at " + PORT)})
.catch((err)=>{console.log(err)})

app.use('/',route)
app.listen(PORT,()=>{
    console.log(`Express is running successfully at PORT ${process.env.PORT}`)
})
       