const mongoose = require("mongoose");

let serviceSchema = new mongoose.Schema({
    title: String,
    image: String,
    image_id: String,
    price: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    ratings: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Rating"
      }
    ],
    flags: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Flag"
      }
   ],
   isFlag: { type: Boolean, default: false }
});

module.exports = mongoose.model("Service", serviceSchema);