// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const mongoose=require('mongoose')
const validator=require('validator')
const internSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate: [{ validator: validator.isEmail, message: 'Please enter email in correct format' }]
    },
    mobile: {
        type:Number,
        required: 'Mobile number is required',
        unique: true,
        trim:true
    },
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'college'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
const internModel=new mongoose.model('intern',internSchema)
module.exports= {internModel}