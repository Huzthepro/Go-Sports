import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//-------------- Static SIGNUP method --------------

userSchema.statics.signup = async function (email, password) {
  // Check for blank areas
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  //Check if entered Email is in valid format
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  //Check if entered password is strong
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  //Check if the email used before
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  //Creating salt
  const salt = await bcrypt.genSalt(10);
  //Hashing the salted password
  const hash = await bcrypt.hash(password, salt);
  //Sending user information
  const user = await this.create({ email, password: hash });
  return user;
};

//-------------- Static LOGIN method --------------

userSchema.statics.login = async function (email, password) {
  // Check for blank areas
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //Check if the email used before
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Wrong mail or password");
  }

  //Check if mail and password match
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Wrong mail or password");
  }

  return user;
};

//Find the "users" collection in database and connect it to userSchema
export default mongoose.model("users", userSchema);
