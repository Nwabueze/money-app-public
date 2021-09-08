import nc from 'next-connect';
import bcrypt from 'bcryptjs'
import date from 'date-and-time'
import { v4 as uuidv4, v4 } from 'uuid';
import RandomNumber from '../../../utils/RandomNumberWithRange'
import PIN4digits from '../../../utils/Pin';
import AppUsers from '../../../models/AppUser';
import db from '../../../utils/db';

//import Cookie from 'js-cookie';


const handler = nc();

handler.get(async (req, res) => {
    
    const data = req.query.q;
    let jsn = JSON.parse(data);

    if(!jsn.email){
        res.json({})
        return;
    }

    if(jsn.type == "register"){
        const now = new Date();
        const pattern = await date.compile('ddd, MMM DD YYYY, HH:mm:ss');
        const codePattern = await date.compile('YYMMDDhhmmss');
        const today = await date.format(now, pattern);
        const code = await date.format(now, codePattern);
        const sufix = await RandomNumber(10, 100);
        const code14digits = (code)+""+(sufix);
        
        const PIN = await PIN4digits();
        
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
            res.json({found: true, pin: PIN, code: code14digits});
        });
    }else if(jsn.type == "login"){
        await db.connect();
        const result = await AppUsers.findOne({ email: jsn.email });
        if (result) {
            await bcrypt.compare(jsn.password, result.password, async function (err, passw) {
                if (passw) {
                    console.log("logged in seccessfully");
                    res.json({ found: true, pin: result.pin, code: result.code14Digit, name: result.firstname });
                } else {
                    console.log("Incorrect credentials");
                    res.json({ found: false });
                }
            });
        }
    }else if(jsn.type == "find"){
        const result = await AppUsers.findOne({email: jsn.email});
        if(result){
            res.json({ found: true, balance: result.balance, firstname: result.firstname, email: result.email, code: result.code14Digit, pin: result.pin });
        }else{
            res.json({ found: false, balance: "Unknown", name: "Unknown", email: jsn.email, code: "Unknown", pin: "Unknown" });
        }
    }else if(jsn.type == "balance"){
        await db.connect();
        const data = await AppUsers.findOne({ email: jsn.email });
        if(data.balance){
            res.json({ found: true, balance: data.balance });
        }
    }else if(jsn.type == "transfer"){
        // Asert that the transfer went and debit the sender
        await db.connect();
        const data0 = await AppUsers.findOne({ email: jsn.email });
        if (data0) {
            const amount = 0 - jsn.amount;
            if (data0.balance - jsn.amount > 50) { // We won't let you empty your account
                await AppUsers.updateOne({ email: jsn.email },
                    { $inc: { balance: amount } });

                // There will be proper check here in the future
                const response = await AppUsers.findOne({ email: jsn.email });
                if (response) {
                    res.json({ sent: true, balance: response.balance });
                    return;
                }
            } else {
                res.json({ sent: false, reason: "insuficient fund" });
            }
        }
    }else if(jsn.type == "credit"){
        // for testing purpose you can add money to your account
        const creditAmount = jsn.amount;
        await AppUsers.updateOne({ email: jsn.email},
            { $inc: { balance: creditAmount } 
        });

        const data1 = await AppUsers.findOne({ email: jsn.email });
        if(data1){
            res.json({ found: true, balance: data1.balance });
            return;
        }
    }else if(jsn.type == "send"){

        // Be sure pin, 14 digit code and amount exist
        if(!jsn.code || !jsn.amount){
            res.json({ sent: false, reason: "Invalid request, no amount or code provided" });
            return;
        }
        
        // Validate the pin
        const check = await AppUsers.findOne({ email: jsn.email, pin: jsn.pin });
        if(!check){
            res.json({ sent: false, reason: "Invalid invalid user PIN" });
            return;
        }

        const check2 = await AppUsers.findOne({ code14Digit: jsn.code });
        if(!check2){
            res.json({ sent: false, reason: "Invalid 14 digit code" });
            return;
        }

        const creditAmount1 = jsn.amount;
        await AppUsers.updateOne({ code14Digit: jsn.code},
            { $inc: { balance: creditAmount1 } 
        });
        
        const debitAmount2 = 0 - jsn.amount;
        await AppUsers.updateOne({ email: jsn.email},
            { $inc: { balance: debitAmount2 } });

        const data2 = await AppUsers.findOne({ email: jsn.email });
        if(data2){
            res.json({ sent: true, balance: data2.balance });
        }
    }
    else{
        res.json({ found: false, reason: "Invalid request" });
    }
    
    
})

export default handler;
