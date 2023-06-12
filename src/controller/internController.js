const axios = require("axios")
const { isValid, isValidrequestBody, isValidString , isValidEmail , isValidMobile } = require("../utils/validations")

//const express=require('express')
const {internModel}=require('../model/internModel')
const createInternDetails= async (req,res)=>{
    try {
        //const { name, email, mobile, collegeName } = data;
         let data=req.body
         if(!isValidrequestBody(data)){
            res.status(400).send({status:false, message:"Please enter College Details"})
          }
    // ------------------------x-------------x--------------x---
    const { name, email, mobile, collegeName } = data;
    if(!isValid(name && email && mobile && collegeName)){
      res.status(400).send({status:false, message:"Please enter Valid Details"})
    } 
    //  ----------------x--------x------x---------x-------x----x----
    if(!isValidString(name)){
        res.status(400).send({status:false, message:"Please enter Valid name"})
      }
      if(!isValidEmail(email)){
        res.status(400).send({status:false, message:"Please enter Valid email"})
      }
      if(!isValidMobile(mobile)){
        res.status(400).send({status:false, message:"Please enter Valid Mobile number"})
      }
    //-----------x-----x---------x-----------x---------x---- 
    const emailUsed = await internModel.findOne({ email: email });
    if (emailUsed) {
      return res.status(400).send({ status: false, message: "Email is already registered" });
    }
    
    const isMobile = await internModel.findOne({ mobile: mobile });
    if (isMobile) {
      return res.status(400).send({ status: false, message: "Mobile number already registered" });
    }

    const collegeCheck = await collegeModel.findOne({ name: collegeName });
    if (!collegeCheck) {
      return res.status(400).send({ status: false, message: "collegeName is not registered" });
    }

   
    let responseData={
                name:data.name,
                email:data.email,
                mobile:data.mobile,
                collegeName:data.collegeName
         }
         console.log(responseData)
        let savedData =await internModel.create(data);
        res.status(201).send({status:true,data:savedData})
    } catch (error) {
        res.status(500).send({status:false,message:`the error is ${error}`})        
    }
}
module.exports={createInternDetails}   


