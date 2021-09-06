import nc from 'next-connect';
import bcrypt from 'bcryptjs'
import date from 'date-and-time'
import { v4 as uuidv4, v4 } from 'uuid';
import RandomNumber from '../../../utils/RandomNumberWithRange'
import PIN4digits from '../../../utils/Pin';
import AppUsers from '../../../models/AppUser';
import db from '../../../utils/db';

import Cookie from 'js-cookie';


const handler = nc();

handler.get(async (req, res) => {
    
    const now = new Date();
    const pattern = await date.compile('ddd, MMM DD YYYY, HH:mm:ss');
    const codePattern = await date.compile('YYMMDDhhmmss');
    const today = await date.format(now, pattern);
    const code = await date.format(now, codePattern);
    const sufix = await RandomNumber(10, 100);
    const code14digits = (code)+""+(sufix);
    
    const PIN = await PIN4digits();

    
    const data = req.query.q;
    let jsn = JSON.parse(data);
    
    //res.send(PIN)
    
    
    const messageId1 = await v4();
    const messageId2 = await v4();

    let validData = jsn.firstname && jsn.lastname && jsn.email && jsn.password;

    const message = `Thank you ${jsn.firstname} for completing your registration on Maney App`;
    const notification = { message_id: messageId1, seen: 0, title: message, time: Date.now(), date: today }
    const log = { message_id: messageId2, seen: 0, title: "1", time: Date.now(), date: today };
    await bcrypt.hash(jsn.password, 8, async (err, hash) => {
        const data = {
            firstname: jsn.firstname, lastname: jsn.lastname, email: jsn.email, password: hash,
            balance: 0, code14Digit: code14digits, pin: PIN, notifications: notification, logs: log
        };
        
        await db.connect();
        const user = new AppUsers(data);
        await user.save();
        //await setSessionData(data);
        res.json({found: true, pin: PIN, code: code14digits});
    });
    
    
    
    //await res.send(jsn.password)
    /*
    if (!validData) {
        res.send("Bad Data recieved")
    } else {

        const userData = { ...jsn, balance: 0, code14Digits: code14digits, pin: PIN, notification: notification, logs: logs }

        await db.connect();
        res.send(JSON.stringify(userData))
        
        const LOCAL = process.env.LOCAL_MONGODB_URI;
        const LIVE = process.env.MONGO_CONN_STR;
        

        res.send("T");


        *
        // Style 1
        await AppUser.deleteMany();
        AppUser.insertOne(resentUser);
        *

        // When done with db 
        //db.disconnect();
        //res.send(code14digits);
    }
    */
    //await db.connect();
    //const users = await AppUsers.find({});
    //await db.disconnect();
    //await res.send(users);
    //const data = req.query.q;
    //const jsn = JSON.parse(data);
    
})

export default handler;
