const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const contributionModel = require('../models/contributionModel');

router.get('/', auth, (req, res, next) => {
    try {
        const paydate = req.query.payment_date;
        if (typeof (paydate) == 'string') {
            const day = paydate.split('-')[0];
            const month = paydate.split('-')[1];
            const year = paydate.split('-')[2];

            contributionModel.find({
                "payment_date":
                {
                    //"$gte": new Date(`${year}-${month - 1}-${day}T00:00:00.000Z`)
                    "$gte": new Date("year-month-dayT00:00:00.000Z"
                        .replace("year", year)
                        .replace("month", "0" + (Number(month) - 1).toString())
                        .replace("day", day)),
                    "$lte": new Date("year-month-dayT00:00:00.000Z"
                        .replace("year", year)
                        .replace("month", "0" + (Number(month) - 1).toString())
                        .replace("day", day + 1))
                }
            }, (err, doc) => {
                if (err) return next(err);
                res.json(doc);
            })
        } else {
            contributionModel
                .find()
                .sort({ payment_date: -1 })
                // .populate('dun', 'name')
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
        }
    } catch (error) {
        next(error)
    }
});

router.get('/:id', auth, (req, res, next) => {
    try {
        const id = req.params.id;
        contributionModel
            .findById(id)
            // .populate('dun', 'name')
            .exec()
            .then(data => {
                if (!data) {
                    return res.status(404).json({
                        message: "Data not found"
                    });
                }
                res.status(200).json({
                    data: data
                })
            })
    } catch (error) {
        next(error)
    }
});

router.post('/', auth, (req, res, next) => {
    try {
        contributionModel.create(req.body, (err, doc) => {
            if (err) return next({
                message: err.message,
                status_code: 400
            });
            res.json(doc);
        })
    } catch (error) {
        next(error)
    }
});

router.post('/:id', auth, (req, res, next) => {
    let payload = req.body;
    let id = req.params.id;
    try {
        contributionModel.update({ _id: id }, { $set: payload }, (err, doc) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send({ msg: 'Contribuição alterada com sucesso', payload });
        });
    }
    catch (error) {
        next(error);
    }
});


router.delete('/:id', auth, (req, res, next) => {
    try {
        _id = req.params.id;
        contributionModel.findOne({ _id: _id }, (err, doc) => {
            if (err) return next({ message: err.message, status_code: 400 });
            contributionModel.deleteOne({ _id: doc._id }, (err) => {
                if (err) return next({ message: err.message, status_code: 400 });
                res.json({ message: "Contribution deleted" });
            });
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;