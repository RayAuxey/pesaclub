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
              // Now we create an array that will hold the new pesaforms being created
              let newPesaforms = [];

              // Now we put new pesaforms in the newPesaforms array
              // with an updated list moving each user higher
              for (let i = 0; i < 3; i++) {
                newPesaforms.push(
                  new Pesaform({
                    level_0: ObjectId(user._id),
                    level_1: doc.level_0,
                    level_2: doc.level_1,
                    level_3: doc.level_2,
                    level_4: doc.level_3,
                    level_5: doc.level_4,
                    level_6: doc.level_5,
                    level_7: doc.level_6
                  })
                );
              }

              // Now this is where we insert the new pesaforms
              Pesaform.collection
                .insert(newPesaforms)
                .then(response => {
                  res.status(200).json(response);
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
