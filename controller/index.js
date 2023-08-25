const user = require('../model');
const bcrypt = require('bcrypt');

const passwordHash = async (password) => {
    try{
        const createHashPassword = await bcrypt.hash(password, 10);
        return createHashPassword;
        
    }catch(error){
       return console.error(error);
    }
 }

exports.post = async(req, res) => {

     try{
        const { name, email, password } = req.body;
        const hashPassword = await passwordHash(password)
        const userExist = await user.findOne({email});

        if(userExist){
            return res.json({
                msg:'user already exists'
            })
        }
        const newUser = await user.create({
            name,
            email,
            password : hashPassword,
        })

        res.json({
            msg: 'user created',
            newUser
        })
        
     }catch(err){
         res.json({
            msg: err
         }).status(400)
     }
}
