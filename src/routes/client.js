const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const contributorModel = require('../models/contributorModel');

router.get('/', auth, (req, res, next) => {
    try {
        const id_number = req.query.id_number;
        console.log(typeof (id_number));
        if (typeof (id_number) != 'undefined' && id_number != null) {
            contributorModel.find({ "id_number": id_number }, (err, doc) => {
                if (err) return next({ message: err.message, status_code: 400 })
                res.json(doc);
            });
        } else {
            return next({ message: "Pass the id_number to retrieve the client", status_code: 400 })
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;
