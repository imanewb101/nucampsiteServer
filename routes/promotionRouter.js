const express = require('express'); 
const promotionRouter = express.Router(); 
const Promotion = require('../models/promotion'); 

promotionRouter.route('/')
.get((req,res,next) => {
    Promotion.find()
    .then(promotions => {
        res.status = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(promotions); 
    })
    .catch(err => next(err))
}) 
.post((req,res,next) => {
    //res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`); 

    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion); 
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403; 
    res.end('PUT operation not supported on /promotion'); 
})
.delete((req, res, next) => {
    //res.end('Deleting all promotion'); 
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 
    })
    .catch(err => next(err));
});
// --------------------------------------------------------------

promotionRouter.route('/:promotionId')
.get((req, res, next) => {
    //res.end(`Will send details of the promotion: ${req.params.promotionId} to you`); 
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(promotion); 
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403; 
    res.end(`POST operation not suppored on /promotions/${req.params.promotionId}`);
})
.put((req, res, next) => {
    //res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    //res.end(`Will update the promotion: ${req.body.name} with description: ${req.body.description}`);
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(promotion); 
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    //res.end(`Deleting promotions: ${req.params.promotionId}`); 
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 
    })
    .catch(err => next(err));
});


module.exports = promotionRouter; 