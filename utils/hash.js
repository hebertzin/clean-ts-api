const bcrypt = require('bcrypt');

const passwordHash = async (password) => {
    try{
        const createHashPassword = await bcrypt.hash(password, 10);
        return createHashPassword;
        
    }catch(error){
       return console.error(error);
    }
 }

module.exports = passwordHash;