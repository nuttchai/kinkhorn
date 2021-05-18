const mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
    shop: { type: String, required: true },
    ownerId: { type: String, required: true },
    area: { type: String },
    menu: [{
        name: { type: String, default: '', trim: true },
        price: { type: Number, default: '', trim: true },
        description: { type: String },
        category: { type: String, default: 'other' }
    }],
    status:  { type: String, default: "open" }
});

module.exports = mongoose.model('Shop', shopSchema, 'shops');