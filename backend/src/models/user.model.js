const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    gender: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
            message: props => `${props.value} is not a email!`
        }
      
    },
    phone: {
        type: String,
      
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps:true });

module.exports = {
    UserModel: model('users', UserSchema)
}