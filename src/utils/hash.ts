const bcrypt = require('bcrypt');

export const passwordHash = async (password : string) => {
    try{
        const createHashPassword = await bcrypt.hash(password, 10);
        return createHashPassword;
        
    }catch(error){
       return console.error(error);
    }
 }

