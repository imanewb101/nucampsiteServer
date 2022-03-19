const express = require('express'); 
const promotionRouter = express.Router(); 
const Promotion = require('../models/promotion'); 
const authenticate = require('../authenticate'); 
const cors = require('./cors'); 

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req,res, next) => {
    Promotion.find()
    .then(promotions => {
        res.status = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(promotions); 
    })
    .catch(err => next(err))
}) 
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
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
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403; 
    res.end('PUT operation not supported on /promotion'); 
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req,res, next) => {
    //res.end(`Will send details of the promotion: ${req.params.promotionId} to you`); 
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(promotion); 
    })
    .catch(err => next(err));
})
.post( cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403; 
    res.end(`POST operation not suppored on /promotions/${req.params.promotionId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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