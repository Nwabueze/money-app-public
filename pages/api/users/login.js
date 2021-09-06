import nc from 'next-connect';

import bcrypt from 'bcryptjs'
import User from '../../../models/AppUser'
import db from '../../../utils/db'
//const session = require('../../../utils/session');

const handler = nc();

handler.get(async (req, res) => {
    if(req.query.q){
        const data = req.query.q;
        const jsn = JSON.parse(data);
        if(!jsn.email || !jsn.password){
            res.send("0");
        }else{
            await db.connect();
            
            const result = await User.findOne({email: jsn.email});
            if(result){
                await bcrypt.compare(jsn.password, result.password, async function(err, passw) {
                    if(passw){
                        //await setSessionData(result);
                        console.log("logged in seccessfully");
                        res.json({ found: true, pin: result.pin, code: result.code14Digit, name: result.firstname });
                    }else{
                        console.log("Incorrect credentials");
                        res.json({ found: false });
                    }
                });   
            }
        }
    }else{
        res.json({found: false});
    }
})

export default handler;
