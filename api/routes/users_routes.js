const router = require("express").Router();

// Import Controller
const UserController = require("../controllers/user_controller");

// Get all users
router.get("/", UserController.index);

// Show pesaforms at a level
router.get("/levels", UserController.levelPesaforms);

// Create a user
router.post("/add", UserController.create);

// Get a single user
// router.get("/:id", UserController.show);

// // Delete a user
// router.delete("/:id", UserController.delete);

// Find and delete user

module.exports = router;
