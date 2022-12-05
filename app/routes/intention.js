const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const intentionModel = require('../models/intentionModel');

router.get('/', auth, (req, res, next) => {
  try {
    intentionModel.find({}, (err, doc) => {
      if (err) return next(err);
      res.json(doc);
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth, (req, res, next) => {
  try {
    const id = req.params.id;
    intentionModel.findById(id, (err, doc) => {
      if (err)
        return next({
          message: 'Cannot find the intention',
          status_code: 400
        });
      res.json(doc);
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, (req, res, next) => {
  try {
    intentionModel.create(req.body, (err, doc) => {
      if (err)
        return next({
          message: err.message,
          status_code: 400
        });
      res.json(doc);
    });
  } catch (error) {
    next(error);
  }
});


router.post('/:id', auth, (req, res, next) => {
  let payload = req.body;
  let id = req.params.id;
  console.log(id, payload);
  console.log(req.body)
  try {
    intentionModel.update({ _id: id }, { $set: payload }, (err, doc) => {
      if (err)
        return res.status(500).send(err);
      console.log(doc);
      return res.json({ status: 200, msg: 'Intenção alterada com sucesso', payload });
    });
  }
  catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, (req, res, next) => {
  try {
    _id = req.params.id;
    intentionModel.findOne({ _id: _id }, (err, doc) => {
      if (err) return next({ message: err.message, status_code: 400 });
      intentionModel.deleteOne({ _id: doc._id }, err => {
        if (err) return next({ message: err.message, status_code: 400 });
        res.json({ message: 'Intention deleted' });
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
