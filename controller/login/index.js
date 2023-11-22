const userModel = require('../../model');
const bcrypt = require('bcrypt');
const { generateJwt } = require('../../jwt')

exports.post = async (req, res) => {
    
    const { email, password } = req.body;

    try{
        
        const user = await userModel.findOne( { email });
        const token = generateJwt(user._id);

        if(!user){
            return res.json({
                msg: "user not found"
            }).status(401)
        }
    
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if(!isValidPassword){
            return res.json({
                msg: "invalid email or password"
            })
        }

        return res.json({
            msg:"user login and generated the token",
            email,
            token
        })

    }catch(error){
        return res.json({
            msg: 'something was wrong',
            email,
        })
    }
}