import bcrypt from  'bcryptjs';



async function checkPassword(password, hash) {
    /*
    ... fetch hash from a db etc.
     hash is a prehashed password
     password is a plain user input, most prefferably fetched from database
    */
    const match = await bcrypt.compare(password, hash);

    return match;

    //...
}

async function hashPassword(passw){
    /*
    await bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
        // Store hash in your password DB.
    });
    */
    const saltRounds = 10;
    const hash = await bcrypt.hash(passw, saltRounds);
    return hash;
}

export default { checkPassword, hashPassword };
