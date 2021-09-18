const jwt=require("jsonwebtoken");
const user=require('../models/user')


const authenticate=async(req,res,next)=>{
	try{
        console.log("PPPPPPPPPPPPPPPPP",req)
        const token=req.cookies['logintoken']
        console.log(token,"authenticate 8")
        console.log('Cookies: ', req.cookies)
        if(!req.cookies.logintoken){
            res.status(401).send("Unauthorized user.")
            console.log(token,"authenticate 10")
            next();
        }
        const verifyToken= jwt.verify(token,"abcdefghhijklmnopq") 
       
        console.log("here?")
       // const rootUser=await pool.query("SELECT user_id,user_name,user_email,user_contact,user_address,user_type FROM newUser WHERE user_id=$1",[verifyToken.user])
       const rootUser = await user.findOne({_id:verifyToken._id})
      // console.log(verifyToken,"authenticate 16")
      console.log(rootUser)
       if(!rootUser){throw new Error("user not found")}
		req.token=token;
		req.rootUser=rootUser
		next();
		}catch(e){
			res.status(401).send("Unauthorized user.")
			console.log(e)
			}
	}

module.exports=authenticate;