const mongoose = require("mongoose");
const ObjectIdType = mongoose.Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const pesaformSchema = new mongoose.Schema(
  {
    level_0: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
    },
    level_1: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
    },
    level_2: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
    },
    level_3: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
    },
    level_4: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
    },
    level_5: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
    },
    level_6: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
    },
    level_7: {
      type: ObjectIdType,
      ref: "User",
      default: new ObjectId()
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
