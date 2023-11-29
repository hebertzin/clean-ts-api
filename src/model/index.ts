import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
       type:  'string',
       required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    password:{
        type:'string',
        required: true,
    }
})

export default mongoose.model('user', userSchema);

