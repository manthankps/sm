const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')


const transaction=new mongoose.Schema({
	id:{
		type:Number,
		required:true,
        unique:true
	},
    idaccount:{
		type:Number,
		required:true,
	},
	description:{
		type:String,
		required:true,
	},
    transactiontype:{
        type:Boolean,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        default:0,
    },
    remark:{
        type:String,
        default:"-",
    },
    entrydate:{
        type:Date,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
        default:0,
    },
},
{
    strict:false,
})

transaction.pre('save',async function(next){        
    next();
})
	
const transactions=mongoose.model("transaction", transaction)
module.exports=transactions;