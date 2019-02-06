const mongoose = require("mongoose");
const ObjectIdType = mongoose.Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const pesaformSchema = new mongoose.Schema(
  {
    level_0: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
    },
    level_1: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
    },
    level_2: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
    },
    level_3: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
    },
    level_4: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
    },
    level_5: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
    },
    level_6: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
    },
    level_7: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId("0")
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
