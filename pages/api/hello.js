import db from '../../utils/db'
import nc from 'next-connect';

const handler = nc();

handler.get(async(req, res)=>{
    await db.connect();
    await db.disconnect();
    res.status(200).json({name: 'John Doe'});
    await res.send('hi')
    await db.connect();
})

