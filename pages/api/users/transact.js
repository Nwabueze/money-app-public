import nc from 'next-connect';
import db from '../../../utils/db';
import AppUsers from '../../../models/AppUser';



const handler = nc();

handler.get(async (req, res) => {
    
    const data = req.query.q;
    const jsn = JSON.parse(data);
    if(!jsn){
        res.json({ sent: false });
        return;
    }
    
    if(!jsn.email){
        res.json({ sent: false });
        return;
    }
    if(jsn.type == "balance"){
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
            res.json({ sent: false });
            return;
        }
        
        // Validate the pin
        const check = await AppUsers.findOne({ email: jsn.email, pin: jsn.pin });
        if(!check){
            res.json({ sent: false });
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
        res.json({ found: false });
    }
    
   
});


export default handler;


