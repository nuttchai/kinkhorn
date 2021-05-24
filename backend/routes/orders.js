const express = require('express');
const Order = require('../models/order');
const OrderRecord = require('../models/orderRecord');
const app_api = require('../app');

const router = express.Router();
//const expiration = 3600 * 24; // second units

// order food from customer
router.post('/customer', async (req, res, next) => {
  try {
    const order = new Order({
      shopId: req.body.shopId,        // .body simplify a complex message to a simple form
      userId: req.body.userId,
      recieveTime: req.body.recieveTime,
      orderList: req.body.orderList
    });

    console.log(req.body)

    const orderedFood = await order.save();
    res.status(201).json({
      orderId: orderedFood._id,
      orderInfo: orderedFood,
      message: 'food ordered sucessfully!'
    })
    
    // update that frontstore queue 
    const frontStoreQueue = await Order.find({ shopId : req.body.shopId })
    // the reason to set "foq" in front of req.body.shopId is to avoid a same id with req.body.userId even if it rarely occur
    await app_api.redis.set("foq" + req.body.shopId, JSON.stringify(frontStoreQueue));

    // update that customer queue
    const customerQueue = await Order.find({ userId : req.body.userId })
    await app_api.redis.set("coq" + req.body.userId, JSON.stringify(customerQueue));

  } catch (e) {
    console.error("unable to store food order", e);
    res.status(400).json({
    success: false,
    message: e
  });
  }
});

// change status to be "accept" or "complete" of the order
router.put('/frontstore/:orderId/:status', async (req, res, next) => {
  try {
    const status = req.params.status;
    const orderId = req.params.orderId;

    if (status != "accept" && status != "complete") {
      res.status(400).json({ message: "invalid status!",
                             status: status, 
                             success: false });
      return;
    }
    Order.updateOne({ _id: orderId }, { status: status })
         .then(result => {
                res.status(200).json({ message: "order updated sucessfully!",
                                       result: result }); 
            }, notfound => {
                res.status(400).json({ message: "unable to update order",
                                       result: notfound });
          });
    
    const order  = await Order.findOne({ _id: req.params.orderId });
    const shopId = order.shopId;
    const userId = order.userId;
    
    // update that frontstore queue
    const frontStoreQueue = await Order.find({ _id : shopId });
    await app_api.redis.set("foq" + shopId, JSON.stringify(frontStoreQueue));

    // update that customer queue
    const customerQueue = await Order.find({ userId : userId })
    await app_api.redis.set("coq" + userId, JSON.stringify(customerQueue));

  } catch (e) {
    console.error("unable to delete order", e);
    res.status(400).json({
      success: false,
      message: e
    });
  }
})

// delete the order 
router.delete('/:command/:orderId', async (req, res, next) => {
  try {

    // order can be completed or cancelled
    const command = req.params.command;
    const orderId = req.params.orderId;

    if (command != "cancel" && command != "complete") {
      res.status(400).json({ message: "invalid command!",
                             command: command, 
                             success: false });
      return;
    }
    // delete order in database
    const query = await Order.findOneAndDelete({ _id: orderId })
    // check result
    if (!query) {
      res.status(404).json({ message: "order not found!",
                             result: query });
      return;
    }
    res.status(200).json({ message: "order deleted sucessfully!",
                           result: query });

    // update that frontstore queue in redis only if the order is completed
    const frontStoreQueue = await Order.find({ shopId : query.shopId })
    // the reason to set "foq" in front of query.shopId is to avoid a same id with query.userId even if it rarely occur
    await app_api.redis.set("foq" + query.shopId, JSON.stringify(frontStoreQueue));

    // update that customer queue in redis
    const customerQueue = await Order.find({ userId : query.userId })
    await app_api.redis.set("coq" + query.userId, JSON.stringify(customerQueue));

    // record the complete order
    const orderRecord = new OrderRecord({
      _id: query._id,
      shopId: query.shopId,       
      userId: query.userId,
      complete: command == "complete",
      orderList: query.orderList
    });
    await orderRecord.save();

    // update the frontstore record in redis only if the order is completed
    const frontStoreRecord = await OrderRecord.find({ shopId : query.shopId, complete : true })
    await app_api.redis.set("for" + query.shopId, JSON.stringify(frontStoreRecord));
  
    // update that customer order record in redis
    const customerRecord = await OrderRecord.find({ userId : query.userId })
    await app_api.redis.set("cor" + query.userId, JSON.stringify(customerRecord));

  } catch (e) {
    console.error("unable to delete order", e);
    res.status(400).json({
      success: false,
      message: e
    });
  }
})

// get order queue (from customer or frontstore view)
router.get('/queue/:viewer/:id', async (req, res, next) => {
  try {

    // "foq" stands for frontstore order queue
    // "coq" stands for customer order queue
    // viewerCode is code that is added to id in redis
    const viewer = req.params.viewer;
    const viewerCode = viewer == "frontstore" ? "foq" :
                       viewer == "customer" ? "coq" :
                       "invalid"

    // If a given viewer in URL is incorrect, return error response
    if (viewerCode == "invalid") {
      res.status(400).json({
        message: "invalid viewer!",
        givenViewer: viewer
      });
      return;
    } 

    // set variable for shopId or customerId (depends on given viewer)
    const id = req.params.id;
    const redisId = viewerCode + id;

    // find data from redis
    const getOrderFromRedis = await app_api.getAsync(redisId);

    if (!getOrderFromRedis) {
      // In case of there is no data in redis but still is in database
      let queue;
      if (viewerCode == "foq") {
        queue = await Order.find({ shopId : id })
      } else {
        queue = await Order.find({ userId : id })
      }
      
      if (queue.length != 0) {
        // data found
        res.status(200).json({
          source: "mongodb",
          message: "query the queue sucessfully!",
          data: queue
        });
        // update in redis given with a apporpriate viewer
        await app_api.redis.set(redisId, JSON.stringify(queue));

      } else {
        // data not found
        res.status(404).json({
          givenId: id,
          message: "no order yet (or maybe invalid given id)",
          data: queue
        });
      }

    } else {
      // in case of data is found in redis
      res.status(200).json({
        source: "redis",
        message: "query the queue sucessfully!",
        data: JSON.parse(getOrderFromRedis)
      });
    }

  } catch (e) {
    console.error("unable to check order", e);
    res.status(400).json({
      success: false,
      message: e
    });
  }
})

// get historical order record
router.get('/record/:viewer/:id', async (req, res, next) => {
  try {

    // "for" stands for frontstore order record
    // "cor" stands for customer order record
    // viewerCode is code that is added to id in redis
    const viewer = req.params.viewer;
    const viewerCode = viewer == "frontstore" ? "for" :
                       viewer == "customer" ? "cor" :
                       "invalid"
    
    // If a given viewer in URL is incorrect, return error response
    if (viewerCode == "invalid") {
      res.status(400).json({
        message: "invalid viewer!",
        givenViewer: viewer
      });
      return;
    } 
    
    // set variable for shopId or customerId (depends on given viewer)
    const id = req.params.id;
    const redisId = viewerCode + id;

    // find data from redis
    const getRecordFromRedis = await app_api.getAsync(redisId);

    if (!getRecordFromRedis) {
      // In case of there is no data in redis but still is in database
      let record;
      if (viewerCode == "for") {
        record = await OrderRecord.find({ shopId : id, complete : true })
      } else {
        record = await OrderRecord.find({ userId : id })
      }

      if (record.length != 0) {
        // data found
        res.status(200).json({
          source: "mongodb",
          message: "query the record sucessfully!",
          data: record
        });
        // update in redis given with a apporpriate viewer
        await app_api.redis.set(redisId, JSON.stringify(record));

      } else {
        // data not found
        res.status(404).json({
          givenId: id,
          message: "no record yet (or maybe invalid given id)",
          data: record
        });
      }

    } else {
      // in case of data is found in redis
      res.status(200).json({
        source: "redis",
        message: "query the record sucessfully!",
        data: JSON.parse(getRecordFromRedis)
      });
    }

  } catch (e) {
    console.error("unable to get the record", e);
    res.status(400).json({
      success: false,
      message: e
    });
  }
  

});


module.exports = router;