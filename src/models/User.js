const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
}, { timestamps: true });

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if(!this.isModified11("password")) return next();
  try{
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
  } catch(err){
     next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
