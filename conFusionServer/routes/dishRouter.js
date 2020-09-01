const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Dishes = require('../models/dishes');
//const Comments = require('../models/comments');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Dishes.find(req.query)
    .populate('comments.dishId')
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//.post(authenticate.verifyUser, (req, res, next) => {
.post(cors.corsWithOptions, (req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//.put(authenticate.verifyUser, (req, res, next) => {
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
//.delete(authenticate.verifyUser, (req, res, next) => {
.delete(cors.corsWithOptions, (req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

dishRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Dishes.findById(req.params.dishId)
    //.populate('comments.dishId')
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//.post(authenticate.verifyUser, (req, res, next) => {
.post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supported');
    /*if (req.body != null) {
        req.body.dishId = req.params.dishId;
        Comments.create(req.body)
        .then((comment) => {
            console.log('Comment Created ');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment);
        }, (err) => next(err))
        .catch((err) => next(err));
    } else {
        err = new Error('Comment not found in request body');
        err.statusCode = 404;
        return next(err);
    }*/
})
//.put(authenticate.verifyUser, (req, res, next) => {
.put(cors.corsWithOptions, (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//.delete(authenticate.verifyUser, (req, res, next) => {
.delete(cors.corsWithOptions, (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;