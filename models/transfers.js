const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transfersSchema = new Schema({

    from: {type:String , required: true},
    to: {type:String , required: true},
    amount: {type:String , required: true},
    date: {type:String , required: true},

},  {
    timestamps: true,
});

const Transfer = mongoose.models.Transfer || mongoose.model('Transfer', transfersSchema);

module.exports = Transfer;