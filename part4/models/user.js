const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  passwordHash: { type: String },
  name: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }]
});

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    delete ret._id;
    delete ret.passwordHash;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
