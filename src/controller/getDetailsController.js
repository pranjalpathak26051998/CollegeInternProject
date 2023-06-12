const axios = require("axios")
const { isValid, isValidrequestBody, isValidString , isValidEmail , isValidMobile } = require("../utils/validations")

const {collegeModel}=require('../model/collegeModel')
const {internModel}=require('../model/internModel')
// const internController=require('../controller/internController')
// const collegeController=require('../controller/collegeController')
const getDetails=async (req,res)=>{
    try {
    let query=req.query.collegeName    
     if(!query) return res.status(400).send({status:false,message:"enter the query "})
     const fetchCollege =await collegeModel.findOne({name:query})  
     let id=fetchCollege._id;    
     //.populate('searcher','item 1 ,item2,item 3')
       let interns=await internModel.find({collegeId:id,isDeleted:false})
                 .populate('collegeId','name fullName logoLink')
                 .select({_id: 1,name: 1,email: 1,mobile: 1,collegeId:0});
/// making key-value form object,with name data for the response

 let data = {
     name:fetchCollege.name,  
     fullName:fetchCollege.fullName,
     logoLink:fetchCollege.logoLink,
     interns:interns   // will be an array of interns because .find returns an array  
 }
     res.status(200).send({status:true,data:data})
        
    } 
    catch (error) 
    {
        res.status(500).send({status:false,message:`the error is ${error}`})        
    }
}
module.exports= {getDetails}

