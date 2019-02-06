const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const pesaformSchema = new mongoose.Schema(
  {
    level_0: {
      type: ObjectId,
      ref: "User",
      default: "0"
    },
    level_1: {
      type: ObjectId,
      ref: "User",
      default: "0"
    },
    level_2: {
      type: ObjectId,
      ref: "User",
      default: "0"
    },
    level_3: {
      type: ObjectId,
      ref: "User",
      default: "0"
    },
    level_4: {
      type: ObjectId,
      ref: "User",
      default: "0"
    },
    level_5: {
      type: ObjectId,
      ref: "User",
      default: "0"
    },
    level_6: {
      type: ObjectId,
      ref: "User",
      default: "0"
    },
    level_7: {
      type: ObjectId,
      ref: "User",
      default: "0"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Pesaform", pesaformSchema);
