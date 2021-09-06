
const { MongoClient } = require('mongodb');


export default async function handler(req, res){

    const LOCAL = process.env.LOCAL_MONGODB_URI;
    const LIVE = process.env.MONGO_CONN_STR;
    let client = new MongoClient(LIVE, { useNewUrlParser: true, useUnifiedTopology: true });
    
    client.connect(async err => {
        if(!err){
           // res.send("Connected");
        }
    });
     
    
    const isConnected = await client._eventsCount;
    res.status(200).json({name: "John Doe"});
    console.log(isConnected)
    
}