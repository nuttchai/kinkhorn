const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    shopId: { type: String, required: true },
    userId: { type: String, required: true },
    shop: { type: String, required: true },
    area: { type: String, required: true },
    orderTime: { type: Date, default: Date.now },
    recieveTime: { type: Date, default: Date.now },
    orderList: [{
        _id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        price: { type: Number,  required: true },
        qty: { type: Number, default: 1 }
    }],
    status: { type: String, default: "notaccept" },
})

module.exports = mongoose.model('Order', orderSchema, 'orders');