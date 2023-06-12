const express=require('express')
const collegeController=require('../controller/collegeController')
const internController=require('../controller/internController')
const getdetailsController=require('../controller/getDetailsController')
const router=express.Router()


router.post('/test-api',(req,res)=>{
    res.send({status:true,data:"Connection running successfully"})
})

router.post('/functionup/colleges',collegeController.createCollegeDetails)
router.post('/functionup/interns',internController.createInternDetails)
router.get('/functionup/collegeDetails',getdetailsController.getDetails)
module.exports=router