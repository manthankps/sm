const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')


const account=new mongoose.Schema({
	id:{
		type:Number,
		required:true,
        unique:true
	},
	name:{
		type:String,
		required:true	
	},
    mobile:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        default:"-",
    },
},
{
    strict:false,
})

account.pre('save',async function(next){        
    next();
})
	
const accounts=mongoose.model("account", account)
module.exports=accounts;