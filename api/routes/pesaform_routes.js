const router = require("express").Router();

// Import Controllers
const PesaformController = require("../controllers/pesaform_controller");

// Routes
/*--------------------------------------------------*/
// Get all pesaforms
router.get("/:page", PesaformController.index);

// Create the First Pesaform
router.post("/", PesaformController.createFirst);

// Buy a pesaform
router.post("/:id", PesaformController.buyPesaform);

// Get a single pesaform by Id
router.get("/id/:id", PesaformController.show);

// Get all pesaforms with user at a level
// router.get("/user/:userId/level/:level", (req, res) => {
//   const userId = req.params.userId;
//   const level = req.params.level;
//   console.log(req.path);
//   Pesaform.find({})
//     .exec()
//     .then(docs => {
//       let response = [];
//       for (let doc of docs) if (doc.users[level] == userId) response.push(doc);

//       if (response.length > 0) res.status(200).json(response);
//       else
//         res.status(404).json({
//           message: `You have no pesaform in level ${level}`
//         });
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
