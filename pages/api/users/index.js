import nc from 'next-connect';
import User from '../../../models/AppUser'
import db from '../../../utils/db'



const handler = nc();

handler.get(async (req, res) => {
    
    const data = req.query.q;
    const jsn = JSON.parse(data);
    
    if(jsn.email){
        await db.connect();
        const result = await User.findOne({email: jsn.email});
        if(result){
            res.json({ found: true, balance: result.balance, firstname: result.firstname, email: result.email, code: result.code14Digit, pin: result.pin });
        }else{
            res.json({ found: false, balance: "Unknown", name: "Unknown", email: jsn.email, code: "Unknown", pin: "Unknown" });
        }
    }else{
        res.json({ found: false, balance: "Unknown", name: "Unknown", email: "Unknown", code: "Unknown", pin: "Unknown" });
    }
    
});


export default handler;