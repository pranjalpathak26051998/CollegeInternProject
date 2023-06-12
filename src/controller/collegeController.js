
const {collegeModel}=require('../model/collegeModel')
const axios = require("axios")
const { isValid, isValidrequestBody, isValidString , isValidEmail , isValidMobile } = require("../utils/validations")

const createCollegeDetails=async (req,res)=>{
  try {
    let data=req.body;
    if(!isValidrequestBody(data)){
        res.status(400).send({status:false, message:"Please enter College Details"})
      }
  
      const { name , fullName, logoLink } = data
      if(!isValidString(name && fullName)){
        res.status(400).send({status:false, message:"Please enter valid college name and fullName"})
      }
      
      if(!isValid(name) && !isValid(fullName)){
        res.status(400).send({status:false , message:"Please provide Valid name and fullName"})
      }

      const isName = await collegeModel.findOne({ name: data.name });

      if(isName){
        res.status(400).send({status:false , message:"College Already Registered"})
      }
       
      try {
        await axios.head(logoLink);
      } catch (error) {
        return res.status(400).send({ status: false, message: "Please provide a valid and accessible logoLink" });
      }
  

      // if(!isValid(logoLink)){
      //   res.status(400).send({status:false , message:"Please provide Valid logoLink"})
      // }
      // const logoLinkCheck = await axios.head(logoLink);
      // if (logoLinkCheck.status !== 200) {
      //   res.status(400).send({ status: false, message: "Please provide a valid and accessible logoLink" });
      // }
  
      const collegeData = await collegeModel.create({
        name,
        fullName,
        logoLink
      })
      const response = {
        name : collegeData.name,
        fullName : collegeData.fullName,
        logoLink : collegeData.logoLink,
        isDeleted :collegeData.isDeleted
      }

   // let details=await collegeModel.create(collegeData)
    res.status(201).send({status:true,data:response})
    
  } 
  catch (error) {
       res.status(500).send({status:false,message:error})    
  }
}

module.exports={createCollegeDetails}