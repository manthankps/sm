const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
//const {OAuth2Client}=require('google-auth-library')
const router=express.Router()


require('../db/conn.js')
const users=require('../models/user.js')
const accounts=require('../models/account.js')
const transactions=require('../models/transaction.js')
// const client=new OAuth2Client(process.env.OAUTH_CLIENTID)
const authenticate=require('../middleware/authenticate.js')


// router.post("/googlelogin",authenticate,async(req,res)=>{
// 		const tokenId=req.body.tokenId
// 		const response=await client.verifyIdToken({idToken:tokenId,audience:process.env.CLIENT_ID})
// 		const {email_verified,email,name}=response.payload
// 				try{
// 				if(email_verified){
// 						const userExists=await RestuarantAppUser.findOne({email:email})
// 						if(userExists){
// 								const token=await userExists.generateAuthToken();
// 								//console.log("line 23",userExists)
// 								res.status(201).json({userExists,token});
// 							}else{
// 									let password="SomeRandomGenPassword"
// 									let cpassword="SomeRandomGenPassword"
// 									const user=new RestuarantAppUser({name,email,password,cpassword})
// 									await user.save()
// 									const userExists=await RestuarantAppUser.findOne({email:email})
// 									const token=await userExists.generateAuthToken();
// 								//	console.log("here")
// 							//		console.log("line 33",userExists)
// 									res.status(201).json({userExists,token});
// 								}
							
// 					}}catch(err){
// 						console.log(err)
// 						}		
// 	})


//admin getdata --working
router.post("/users",async(req,res)=>{
    // try{
    //     const userObj={
    //         id:1,
    //         name:"om",
    //         username:"om",
    //         password:"om"
    //     }
    

  //  res.send("welcome user")    
    //     const user=new users(userObj)
    //     await user.save()
    //     res.send("done")
    // }catch(e){
    //     console.log(e)
    // }
  



    const {email,password}=req.body
    console.log(email,password)
    console.log("here")
		//res.cookie("mycookie","cookie")
        const userExists = await users.findOne({username:email})
			// 	user.find({username:"om",password:"o"},(err,tables)=>{
			// 	res.send(tables)
			// })
            const token=jwt.sign({_id:userExists._id},"abcdefghhijklmnopq");

            const isMatch=await bcrypt.compare(password,userExists.password);
            if(isMatch){
                console.log(" setting cookie")
                res.cookie("logintoken",token,{
                    httpOnly:false,
                })
                console.log("cookie sets",token)
                const {id,name,username}=userExists
                let finalObj={id,name,username}
                res.send(finalObj)

            }


	 })

     router.get("/login",authenticate,async(req,res)=>{
        // try{
        //     const userObj={
        //         id:1,
        //         name:"om",
        //         username:"om",
        //         password:"om"
        //     }
        
    
    
        
    
    
        //res.send("welcome user")    
        //     const user=new users(userObj)
        //     await user.save()
        //     res.send("done")
        // }catch(e){
        //     console.log(e)
        // }
      
    
    
    
        let username="om"
        let password="om"
        	//res.cookie("mycookie","cookie")
            const userExists = await users.findOne({username})
        		// 	user.find({username:"om",password:"o"},(err,tables)=>{
        		// 	res.send(tables)
        		// })
                const token=jwt.sign({_id:userExists._id},"abcdefghhijkl");
    
                const isMatch=await bcrypt.compare(password,userExists.password);
                if(isMatch){
                    res.cookie("logintoken",token,{
                    })
                    res.send(token)
    
                }
    
    
         })


    router.post("/account",async(req,res)=>{
        try{
            const {id, name, mobile, address}=req.body
            const accountObj={id, name, mobile, address}

            console.log(accountObj);

            const account=new accounts(accountObj)
            await account.save()
            res.send("Account saved")
        }catch(e){
            console.log(e)
            res.status(400).json({errMsg:e})
        }
    })


    router.get("/account",async(req,res)=>{
        try{
            const accountExists = await accounts.find({})
            let accountObj=[]
            accountExists.map((rowobj)=>{
                accountObj.push({id:rowobj.id, name:rowobj.name, mobile:rowobj.mobile, amount:1000})
            })
            //const accountObj={id,name,amount:1000}
            console.log(accountObj)
            res.send(accountObj)
        }catch(e){
            console.log(e)
            res.status(400).json({errMsg:e})
        }
    })


    router.post("/transaction",async(req,res)=>{
        try{
            const {id, idaccount, description, transactiontype, amount, remark, entrydate, status}=req.body
            console.log("========>>>>>>>>>>>>",req.body)
            const accountObj={id, idaccount, description, transactiontype, amount, remark, entrydate:new Date(), status:1}

            console.log(accountObj);

            const account=new transactions(accountObj)
            await account.save()
            res.send("Transaction saved")
        }catch(e){
            console.log(e)
            res.status(400).json({errMsg:e})
        }
    })

    router.get("/transaction/:id",async(req,res)=>{
        try{
            const {id}=req.params
            const transactionExists = await transactions.find({idaccount:id})
            let transactionObj=[]
            transactionExists.map((rowobj)=>{

                const edate=rowobj.entrydate.toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                }).replace(/ /g, '-') + " " + rowobj.entrydate.toLocaleTimeString()

                transactionObj.push({id:rowobj.id, description:rowobj.description, transactiontype:rowobj.transactiontype, amount:rowobj.amount, remark:rowobj.remark, entrydate:edate})
            })
            //const transactionObj={id,name,amount:1000}
            console.log(transactionObj)
            res.send(transactionObj)
        }catch(e){
            console.log(e)
            res.status(400).json({errMsg:e})
        }
    })


    // router.get("/maxid/:collection/:key",async(req,res)=>{
    //     try{
    //         const{collection,key}=req.params
    //         console.log("YYYYYYYYYYYYY")

    //         const maxId = await (collection).find().sort({id:-1}).limit(1)
    //         console.log("HHHHHHHHHHHHHHHHHHHH", maxId[0])
    //         res.send(maxId[0])
    //     }catch(e){
            
    //         console.log(e)
    //         res.status(400).json({errMsg:e})
    //     }
    // })

    router.get("/maxaccountid",async(req,res)=>{
        try{
            // const collection=accounts
            // console.log("YYYYYYYYYYYYY")

            const maxId = await accounts.find().sort({id:-1}).limit(1)
            console.log("HHHHHHHHHHHHHHHHHHHH", maxId[0].id)
            res.status(200).json({id:maxId[0].id+1})
        }catch(e){
            
            console.log(e)
            res.status(400).json({errMsg:e})
        }
    })

    router.get("/maxtransactionid",async(req,res)=>{
        try{
            // const collection=transactions
            // console.log("YYYYYYYYYYYYY")

            const maxId = await transactions.find().sort({id:-1}).limit(1)
            res.status(200).json({id:maxId[0].id+1})
        }catch(e){
            
            console.log(e)
            res.status(400).json({errMsg:e})
        }
    })


	router.get("/",authenticate,(req,res)=>{
		res.status(200).json({message:"authenticated"})
	})
	router.get("/checkout",authenticate,(req,res)=>{
		res.status(200).json({message:"authorised user"})
	})
	router.get("/userinfo",authenticate,(req,res)=>{
		res.status(200).json({message:"authorised user"})
	})
	router.get("/logout",(req,res)=>{
		res.clearCookie("logintoken")
		res.status(200).json({message:"logout success"})
	})
module.exports=router