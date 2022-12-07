const ContributorModel = require("../models/contributorModel");
const mongoose = require("mongoose");

class ContributorController {

  constructor() {}

  getAll(req, res, next) {
    try {
      ContributorModel.find({}, null, { sort: { name: -1 } }, (err, doc) => {
        if (err)
          return next(err);
        res.json(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  get(req, res, next) {
    console.log(req.params);
    try {
      const id = req.params.id;
      ContributorModel.findById(id, (err, doc) => {
        if (err)
          return next({ message: "Cannot find a contributor with this id parameter", status_code: 400 });
        res.json(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  update(req, res, next) {
    try {
      ContributorModel.findByIdAndUpdate(req.params.id, req.body.contributor, { new: true }, (err, doc) => {
        if (err)
          return res.status(500).send(err);
        return res.send(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  remove(req, res, next) {
    try {
      const id = new mongoose.mongo.ObjectID(req.params.id);
      ContributorModel.findOneAndRemove({ _id: id }, (err, doc) => {
        if (err)
          return next(err);
        res.json(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  contributions(req, res, next) {
    console.log(req.body);
    try {
      _id = req.params.id;
      ContributorModel.findOne({ _id: _id }, "contributions", (err, doc) => {
        if (err)
          return next(err);
        res.json(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  allContributions(req, res, next) {
    console.log(req.body);
    try {
      ContributorModel.find({}, "contributions", (err, doc) => {
        if (err)
          return next(err);
        res.json(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  addContribution(req, res, next) {
    try {
      let contrib = req.body.contribution;
      ContributorModel.update({ _id: req.params.id }, {
        $push: {
          contributions: {
            $each: [contrib],
            $sort: { payment_date: -1 }
          }
        }
      }, (err, doc) => {
        if (err)
          return next({ message: err.message, status_code: 400 });
        res.json(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  updateContribution(req, res, next) {
    console.log(req.body.contribution);
    try {
      _id = req.params.id;
      id_contrib = req.params.id_contrib;
      contrib = req.body.contribution;
      ContributorModel.update({ _id: _id }, {
        $push: {
          contributions: {
            $each: [contrib],
            $sort: { payment_date: -1 }
          }
        }
      }, (err, doc) => {
        if (err)
          return next({ message: err.message + 'AAAAAA', status_code: 400 });
        ContributorModel.findOne({ _id: _id }, (err, contrib_doc) => {
          if (err)
            return next({ message: err.message, status_code: 400 });
          contrib_doc.contributions.pull({ _id: id_contrib });
          contrib_doc.save();
          res.json(contrib_doc);
        });
      });
    }
    catch (error) {
      next(error);
    }
  }

  removeContribution(req, res, next) {
    try {
      let id = req.params.id;
      let id_contrib = req.params.id_contrib;

      console.log(id, id_contrib)

      ContributorModel.findOne({ _id: id }, (err, doc) => {
        // console.log(doc.contributions)

        if (err) {
          return next({ message: err.message, status_code: 400 });
        }
        doc.contributions.pull({ _id: id_contrib });
        doc.save();
        res.json(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  addChild(req, res, next) {
    try {
      _id = req.params.id;
      child = req.body.child;
      ContributorModel.findOne({ _id: _id }, function (err, doc) {
        if (err)
          return next({ message: err.message, status_code: 400 });
        doc.children.push(child).then(doc.save().then(res.json(doc)));
      });
    }
    catch (error) {
      next(error);
    }
  }

  create (req, res, next){
    console.log(req.body.contributor)
    try {
      ContributorModel.create(req.body.contributor, function (err, doc) {
        if (err) return next({ message: err.message, status_code: 400 });
        res.json(doc);
      });
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new ContributorController();