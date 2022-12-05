const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken')

class UserController {

  constructor() {}

  getAll(req, res, next) {
    console.log(req.query);
    UserModel.find(({}), (err, doc) => {
      if (err)
        next(err);
      res.json(doc);
    });
  }

  getById(req, res, next) {
    const id = req.params.id;
    UserModel.find(({ '_id': id }), (err, doc) => {
      if (err)
        next(err);
      res.json(doc);
    });
  }

  update(req, res, next) {
    try {
      const { name, email, admin, active } = req.body;
      if (!name || !email) {
        res.status(400).json({
          msg: 'Please enter name and e-mail, this route don\'t update the password'
        });
      }
      UserModel.findByIdAndUpdate({ '_id': req.params.id }, { name: name, email: email, admin: admin, active: active }, { new: true }, (err, doc) => {
        if (err)
          return res.status(500).send(err);
        return res.send({ "name": doc.name, "email": doc.email, "admin": doc.admin, "active": doc.active });
      });
    }
    catch (error) {
      next(error);
    }
  }

  changePassword(req, res, next) {
    try {
      const id = req.params.id;
      const { password } = req.body;
      if (!password) {
        return next({
          message: "The password is required",
          status_code: 400
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err)
            throw err;
          UserModel.findByIdAndUpdate({ '_id': id }, { password: hash }, { new: true }).exec()
            .then(user => {
              jwt.sign({ id: user.id }, config.get('jwtsecret'), { expiresIn: 3600 }, (err, token) => {
                if (err)
                  throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              });
            });
        });
      });
    }
    catch (error) {
      next(error);
    }
  }

  remove(req, res, next) {
    let id = req.params.id;
    try {
      UserModel.findByIdAndRemove({ '_id': id }, (err, doc) => {
        if (err)
          return res.status(500).send(err);
        return res.send(doc);
      });
    }
    catch (error) {
      next(error);
    }
  }

  create(req, res, next) {
    const { name, email, password, admin, active } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ msg: 'Por gentileza, preencha todos os campos' })
    }

    UserModel.findOne({ email })
      .then((user) => {
        if (user) res.status(400).json({ msg: 'Usuário com este email já cadastrado' })

        const newUser = new UserModel({
          name,
          email,
          password,
          admin,
          active
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => {
                jwt.sign({ id: user.id },
                  config.get('jwtsecret'),
                  { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        admin: user.admin,
                        active: user.active
                      }
                    })
                  })
              })
          })
        })
      })
  }
}
module.exports = new UserController();