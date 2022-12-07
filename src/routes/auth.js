/*
Users' Router
This router contains all endpoints for the User entit
*/
const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  UserModel.findOne({ email }).then(user => {
    if (!user) res.status(400).json({ msg: "User does not exists" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) res.status(400).json({ msg: "Invalid Credentials " });

      jwt.sign(
        { id: user.id },
        config.get("jwtsecret"),
        { expiresIn: 43200 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              admin: user.admin
            }
          });
        }
      );
    });
  });
});

module.exports = router;
