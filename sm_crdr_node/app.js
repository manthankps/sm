const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
 const cookieparser=require('cookie-parser')
const PORT=process.env.PORT || 3001


dotenv.config({path:'./.env'})
// app.use(cors( {origin: "http://localhost:3000",
app.use(cors( {origin: "http://localhost:3000",
credentials: true}));
 app.use(cookieparser())
app.use(express.json())
require('./db/conn.js')
//const authenticate=require('./middleware/authenticate.js')



app.use(require('./routes/auth.js'))

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    
}
app.listen(PORT,(req,res)=>{
		console.log("server on at port 3001")
	})