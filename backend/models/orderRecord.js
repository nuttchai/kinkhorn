const mongoose = require('mongoose');

const orderRecordSchema = mongoose.Schema({
    shopId: { type: String, required: true },
    userId: { type: String, required: true },
    time: { type: Date, default: Date.now },
    complete: { type: Boolean, required: true },
    orderList: [{
        _id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        price: { type: Number,  required: true },
        qty: { type: Number, default: 1 }
    }],
})

module.exports = mongoose.model('OrderRecord', orderRecordSchema, 'orderRecords');