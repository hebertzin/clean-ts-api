const user = require('../model');
const passwordHash = require('../utils/hash');

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
