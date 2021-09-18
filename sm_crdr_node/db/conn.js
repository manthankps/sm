// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://root:root@sm-crdr.hvlib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("sm-crdr").collection("user");
//   // perform actions on the collection object
//   client.close();
// });



const mongoose=require('mongoose')
//const dotenv=require('dotenv')



mongoose.connect("mongodb+srv://root:root@sm-crdr.hvlib.mongodb.net/sm-crdr?retryWrites=true&w=majority",{
	useNewUrlParser:true,
	
	useUnifiedTopology:true,
	
	
	}).then(()=>{
	console.log('connection successful')
	}).catch((err)=>console.log(err))