const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: Buffer,
      required: true,
    },
    creator: {
      type: { name: String },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
