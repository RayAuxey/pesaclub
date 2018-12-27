const bcrypt = require("bcrypt");

// Import Models
const User = require("../models/user");
const Pesaform = require("../models/pesaform");

class UserController {
  // Show all users
  index(req, res) {
    const page = req.query.page;
    const perPage = 10;
    User.find({})
      .skip(perPage * page - perPage)
      .select("name email pesaforms")
      .exec()
      .then(users =>
        res.status(200).json({
          count: users.length,
          users: users,
          meta: {
            currentPage: page,
            perPage: perPage
          }
        })
      )
      .catch(err => res.status(500).json(err));
  }

  // Show a user by id
  show(req, res) {
    const id = req.params.id;
    User.findById(id)
      .select("name email pesaforms")
      .exec()
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));
  }

  // Add a new user
  create(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err)
        return res.status(500).json({
          err
        });
      else {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          pesaforms: [[], [], [], [], [], [], [], []]
        });
        user
          .save()
          .then(user => res.status(201).json(user))
          .catch(err => res.status(500).json(err));
      }
    });
  }

  // Delete a user
  delete(req, res) {
    const id = req.params.id;
    User.findOneAndDelete({ _id: id })
      .exec()
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));
  }

  // Show pesa forms at a level
  levelPesaforms(req, res) {
    const userId = req.query.id;
    const level = req.query.level;
    console.log(req.query);
    User.findById(userId)
      .exec()
      .then(user => {
        if (user)
          Pesaform.find({ _id: { $in: user.pesaforms[level] } })
            .exec()
            .then(pesaforms => res.status(200).json(pesaforms))
            .catch(err =>
              res.status(500).json({
                error: err
              })
            );
        else
          res.status(404).json({
            error: "No such user"
          });
      });
  }
}

module.exports = new UserController();
