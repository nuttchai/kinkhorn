const express = require('express');
const multer = require('multer');
const multers3 = require('multer-s3');

const Shop = require('../models/shop');
const app_api = require('../app');

const router = express.Router();
const title = "shopList";
//const expiration = 3600; // second units

const fs = require('fs');
const path = require('path');

// These values will be either what's in .env,
// or what's in the Docker, Heroku, AWS environment
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET_NAME = 'kinkhorn-bucket-1';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

// upload image
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const upload = multer({ 
    storage: multers3({
        s3:s3,
        bucket:AWS_BUCKET_NAME,
        ACL:'public-read',
        contentType: (req,file,cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null,ext);
        },
        key:(req, file, cb) => {
    
            const name = file.originalname.split('.')[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            const ext = MIME_TYPE_MAP[file.mimetype];
            const nameFile = name + "." + ext
            cb(null, nameFile);
          }
    }) 
});

router.post('/upload', upload.single('image'), async (req, res) => {    
    res.send('uploaded!')
});

// get shop list (frontstore side)
router.get('/frontstore/:ownerId', async (req, res, next) => {
    try {
        const ownerId = req.params.ownerId;
        const redisId = title + ownerId;
        // find data from redis
        const getTitleDataFromCache = await app_api.getAsync(redisId);

        if (!getTitleDataFromCache) {
            
            const result = await Shop.find({ ownerId : ownerId });
            // send result from mongodb
            res.status(200).json({
                message: "message sent successfully!",
                source: "mongodb",
                data: result
            });
            // add shopList (frontstore view) to redis
            await app_api.redis.set(redisId, JSON.stringify(result));

            return;
        }

        // send result from redis
        res.status(200).json({
        message: "message sent successfully!",
        source: "redis",
        data: JSON.parse(getTitleDataFromCache)
        });

    } catch (e) {
        console.error("unable to get list of shops", e);
        res.status(400).json({
        success: false,
        message: e
        });
    }
})

// get shop list (customer side)
router.get('/customer', async (req, res, next) => {
    try {
        // find data from redis
        const getTitleDataFromCache = await app_api.getAsync(title);

        if (!getTitleDataFromCache) {
            
            const result = await Shop.find();
            // send result from mongodb
            res.status(200).json({
                message: "message sent successfully!",
                source: "mongodb",
                data: result
            });
            // add shopList to redis
            await app_api.redis.set(title, JSON.stringify(result));

            return;
        }

        // send result from redis
        res.status(200).json({
        message: "message sent successfully!",
        source: "redis",
        data: JSON.parse(getTitleDataFromCache)
        });

    } catch (e) {
        console.error("unable to get list of shops", e);
        res.status(400).json({
        success: false,
        message: e
        });
    }
})

// create shop (frontstore side)
router.post('/frontstore', async (req, res, next) => {
    try {
        const ownerId = req.body.ownerId;

        const shop = new Shop({
            shop: req.body.shop,
            ownerId: ownerId,
            area: req.body.area,
            menu: req.body.menu,
            status: req.body.status
        });

        const createdShop = await shop.save()
        res.status(201).json({
            shopId: createdShop._id,
            shopInfo: createdShop,
            message: 'shop added sucessfully!'
        })

        // update shopList (customer view) to redis
        const updatedResult = await Shop.find()
        await app_api.redis.set(title, JSON.stringify(updatedResult));
        
        // update shopList (frontstore view) in redis
        const redisId = title + ownerId;
        const result = await Shop.find({ ownerId : ownerId });
        await app_api.redis.set(redisId, JSON.stringify(result));
        
    } catch (e) {
        console.error("unable to record shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }
});

// update frontstore
router.put("/frontstore", async (req, res, next) => {
    try {
        
        const ownerId = req.body.ownerId;
        const shopId  = req.body._id;

        const shop = new Shop({
            _id: shopId,
            shop: req.body.shop,
            ownerId: ownerId,
            area: req.body.area,
            menu: req.body.menu
        });

        Shop.updateOne({ _id: shopId }, shop)
            .then(result => {
                    res.status(200).json({ message: "shop updated sucessfully!",
                                           result: result }); 
                }, notfound => {
                    res.status(400).json({ message: "unable to update shop (wrong Id)",
                                           result: notfound });
                });

        // update shopList (customer view) in redis
        const updatedResult = await Shop.find();
        await app_api.redis.set(title, JSON.stringify(updatedResult));

        // update shopList (frontstore view) in redis
        const redisId = title + ownerId;
        const result = await Shop.find({ ownerId : ownerId });
        await app_api.redis.set(redisId, JSON.stringify(result));
        
    } catch (e) {
        console.error("unable to record shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }

})

// remove shop (frontstore side)
router.delete("/frontstore/:shopId", async (req, res, next) => {
    try {

        //find ownerId from given shop (use to update redis)
        const shopId = req.params.shopId
        const givenShop = await Shop.findOne({ _id: req.params.shopId });
        const ownerId = givenShop.ownerId

        //delete shop in mongodb
        Shop.deleteOne({ _id: shopId })
            .then(result => {
                    if (result.n == 1) {
                        res.status(200).json({ message: "shop deleted sucessfully!",
                                               result: result }); 
                    } else {
                        res.status(404).json({ message: "shop already deleted!",
                                               result: result }); 
                    }
                }, notfound => {
                    res.status(400).json({ message: "unable to delete shop (wrong Id)",
                                           result: notfound });
                });
                
        // update shopList to redis
        const updatedResult = await Shop.find();
        await app_api.redis.set(title, JSON.stringify(updatedResult));

        // update shopList (frontstore view) in redis
        const redisId = title + ownerId;
        const result = await Shop.find({ ownerId : ownerId });
        await app_api.redis.set(redisId, JSON.stringify(result));

    } catch (e) {
        console.error("unable to delete shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }

})

// open/close shop
router.put("/frontstore/:action", async (req, res, next) => {
    try {
        const shopId = req.body._id;
        const ownerId = req.body.ownerId;
        const action = req.params.action;

        if (action != "open" && action != "close") {
            res.status(400).json({ message: "invalid action!",
                                   status: action, 
                                   success: false });
            return;
        }

        let shopResult = await Shop.findOneAndUpdate({ _id : shopId, ownerId: ownerId }, { status : action }, { new: true })
        if (shopResult) {
            res.status(200).json({ message: "shop updated sucessfully!",
                                   result: shopResult }); 
        } else {
            res.status(400).json({ message: "unable to update shop (wrong Id)",
                                   result: notfound });
        }

        // update shopList in redis
        const updatedResult = await Shop.find();
        await app_api.redis.set(title, JSON.stringify(updatedResult));

        // update shopList (frontstore view) in redis
        const redisId = title + ownerId;
        const result = await Shop.find({ ownerId : ownerId });
        await app_api.redis.set(redisId, JSON.stringify(result));
        
    } catch (e) {
        console.error("unable to record shop", e);
        res.status(400).json({
        success: false,
        message: e
    });
    }

})

module.exports = router;