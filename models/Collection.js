const { model, Schema } = require("mongoose");

const collectionSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  recipes: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Collection", collectionSchema);
