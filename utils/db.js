import mongoose from 'mongoose';

var conn = {};

/* MONGO_CONN_STR is now use for the e-commerce demo */
async function connect(){
   
    if(conn.isConnected){
        console.log('db already connected');
        return;
    }
    
    if(mongoose.connection.length > 0){
        if(conn._eventsCount){
            console.log('use previous db connection');
            return;
        }
        await mongoose.disconnect();
    }

    const LOCAL = process.env.LOCAL_MONGODB_URI;
    const LIVE = process.env.MONGO_CONN_STR;
    const con = await mongoose.connect(LIVE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    
    conn.isConnected = await con.connections;
    console.log('db connected');
}

async function disconnect(){
    
    if(conn.isConnected){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect();
            conn.isConnected = false;
            console.log('db disconnected');
        }else{
            console.log('db not disconnected');
        }
    }
    
}

function convertDocToObj(doc){
    if(!doc){
        return false;
    }
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;

