const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({

    fname: {type:String , required: true},
    lname: {type:String , required: true},
    contact: {type:String , required: true},
    email: {type:String , required: true , unique:true},
    password: {type:String , required: true},

},  {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', usersSchema);

module.exports = User;