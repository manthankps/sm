const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')


const user=new mongoose.Schema({
		id:{
			type:Number,
			required:true,
            unique:true
			},
		name:{
			type:String,
			required:true	
			},
        username:{
            type:String,
            required:true,
            unique:true
            },
        password:{
            type:String,
            required:true,
        },
	},
    {
        strict:false,
    })

    user.pre('save',async function(next){
		
        if(this.isModified('password')){
                
                this.password=await bcrypt.hash(this.password,10);
            }
        
            next();
    })
	
const users=mongoose.model("user", user)
module.exports=users;