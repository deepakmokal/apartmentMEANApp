const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


let schema = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    creation_Dt: { type: Date, require: true },
    isActive: {type:Boolean}
});

//To encrypt Password
schema.statics.hashPassword = function(password) {
    return bcrypt.hashSync(password, 10);
}

//To Comapare Password
schema.methods.isValid = function(hashPassword) {
    return bcrypt.compareSync(hashPassword, this.password);
}

module.exports = mongoose.model('User', schema);