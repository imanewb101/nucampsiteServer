const express = require('express'); 
const partnerRouter = express.Router(); 
const Partner = require('../models/partner'); 

partnerRouter.route('/')
.get((req,res, next) => {
    //res.end('WIll send all the partner to you'); 
    Partner.find()
    .then(partners => {
        res.status = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(partners); 
    })
    .catch(err => next(err))
}) 
.post((req,res, next) => {
    //res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`); 
    Partner.create(req.body)
    .then(partner => {
        console.log('Partner Created ', partner);
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json');
        res.json(partner); 
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403; 
    res.end('PUT operation not supported on /partner'); 
})
.delete((req, res, next) => {
    Partner.deleteMany()
    .then(response => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 
    })
    .catch(err => next(err)); 
});
// --------------------------------------------------------------

partnerRouter.route('/:partnerId')
.get((req, res) => {
    //res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
    Partner.findById(req.params.partnerId)
    .then(partner => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(partner); 
    })
    .catch(err => next(err)); 
})
.post((req, res) => {
    res.statusCode = 403; 
    res.end(`POST operation not suppored on /partners/${req.params.partnerId}`);
})
.put((req, res) => {
    //res.write(`Updating the partner: ${req.params.partnerId}\n`);
    //res.end(`Will update the partner: ${req.body.name}with description: ${req.body.description}`);
    Partner.findByIdAndUpdate(req.params.partnerId, {
        $set: req.body
    }, { new: true })
    .then(partner => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(partner); 
    })
    .catch(err => next(err));
})
.delete((req, res) => {
    //res.end(`Deleting partners: ${req.params.partnerId}`); 
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(response => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(response); 
    })
    .catch(err => next(err));
});


module.exports = partnerRouter; 