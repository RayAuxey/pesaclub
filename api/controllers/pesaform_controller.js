const ObjectId = require("mongoose").Types.ObjectId;

// Import Models
const Pesaform = require("../models/pesaform");
const User = require("../models/user");

class PesaformController {
  // Return all pesafroms
  index(req, res) {
    const page = req.params.page;
    const perPage = 10;
    Pesaform.find({})
      .skip(perPage * page - perPage)
      .populate("level_0", "name")
      .populate("level_1", "name")
      .populate("level_2", "name")
      .populate("level_3", "name")
      .populate("level_4", "name")
      .populate("level_5", "name")
      .populate("level_6", "name")
      .populate("level_7", "name")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          pesaforms: docs,
          meta: {
            currentPage: page,
            perPage: perPage
          }
        });
      })
      .catch(err => console.log(err));
  }

  showOne(req, res) {
    Pesaform.findOne({})
      .exec()
      .then(doc => res.status(200).json(doc));
  }
  // Show pesaform by Id
  show(req, res) {
    const id = req.params.id;
    Pesaform.findById(id)
      .populate("level_0", "name")
      .populate("level_1", "name _id")
      .populate("level_2", "name _id")
      .populate("level_3", "name _id")
      .populate("level_4", "name _id")
      .populate("level_5", "name _id")
      .populate("level_6", "name _id")
      .populate("level_7", "name _id")
      .exec()
      .then(doc => res.status(200).json(doc))
      .catch(err => console.log(err));
  }

  // Create the first pesaform
  createFirst(req, res) {
    Pesaform.find()
      .exec()
      .then(docs => {
        if (docs.length === 0) {
          const pesaform = new Pesaform();
          pesaform
            .save()
            .then(doc => res.status(201).json(doc))
            .catch(err => console.log(err));
        } else {
          res.status(400).json({
            error: "You cannot create a pesaform"
          });
        }
      })
      .catch(err => res.status(500).json(err));
  }

  // Buy a pesaform
  // This is the most complicated request handler in the app
  // Involves a user buying a pesaform
  buyPesaform(req, res) {
    const pesaformId = req.params.id;
    // First we search for the user by ID
    User.findById(req.body.userId)
      .exec()
      .then(user => {
        // We check if the user exists
        if (user) {
          // When a pesaform is bought we delete it from db
          Pesaform.findOneAndDelete({ _id: pesaformId })
            .exec()
            .then(doc => {
              // We check if there is someone in level 7
              // If there is we remove them in the list of users
              // but store them for future
              let lastUser;
              if (doc.users.length >= 8) lastUser = doc.users.pop();

              // Now we create an array that will hold the new pesaforms being created
              let newPesaforms = [];

              // We create a level list that will hold the users including the
              // new user at level 0
              let levelList = doc.users;
              levelList.unshift(ObjectId(user._id));
              // console.log(levelList);

              // Now we put new pesaforms in the newPesaforms array
              for (let i = 0; i < 3; i++) {
                newPesaforms.push(
                  new Pesaform({
                    users: levelList
                  })
                );
              }

              // Now this is where we insert the new pesaforms
              Pesaform.collection
                .insert(newPesaforms)
                .then(response => {
                  User.find({ _id: { $in: levelList } })
                    .select("_id pesaforms")
                    .exec()
                    .then(users => {
                      let newIds = [];
                      response.ops.forEach((pesaform, i) => {
                        newIds.push(pesaform._id);
                      });
                      users.forEach((user, i) => {
                        for (let j = 0; j < user.pesaforms.length; j++) {
                          if (String(user._id) === String(levelList[j])) {
                            newIds.forEach((id, index) => {
                              user.pesaforms[j].push(id);
                            });
                            if (j > 0)
                              for (
                                let k = 0;
                                k < user.pesaforms[j - 1].length;
                                k++
                              )
                                if (
                                  String(user.pesaforms[j - 1][k]) ==
                                  String(doc._id)
                                ) {
                                  user.pesaforms[j - 1].splice(k, 1);
                                  break;
                                }
                          }
                          // console.log(user);
                          User.findByIdAndUpdate(user._id, user)
                            .exec()
                            .then(newUser => {
                              console.log(newUser);
                            })
                            .catch(err => console.log(err));
                        }
                      });
                      res.status(200).json(response);
                    })
                    .catch(err => console.log(err));
                  if (lastUser) {
                    User.findById(lastUser)
                      .exec()
                      .then(user => {
                        for (let k = 0; k < user.pesaforms[7].length; i++)
                          if (
                            String(user.pesaforms[7][k]) === String(doc._id)
                          ) {
                            user.pesaforms[7].splice(k, 1);
                            break;
                          }
                      });
                  }
                })
                .catch(err =>
                  res.status(500).json({
                    err
                  })
                );
            })
            .catch(err => console.log(err));
        } else {
          res.status(403).json({
            error: "Buyer does not exist"
          });
        }
      });
  }
}

module.exports = new PesaformController();
