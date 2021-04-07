const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    name: {type: String, required: true},
    given_name: {type: String, required: true},
    family_name: {type: String, required: true},
    picture: {type: String, required: true},
    email: {type: String, required: true},
    email_verified: {type: Boolean},
    hd: {type: String},
    money: {type: Number, default: 0}
})

module.exports = mongoose.model('People', peopleSchema, 'people');