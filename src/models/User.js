const mongoose = require("mongoose");
const { DATA_PRIVILEDGES_TYPE } = require("../contants/constant");
var bcrypt = require("bcryptjs");
const generatePassword = require("../services/auth/generatePassword");

/**
 * password will be auto generated by the system.
 * and sent using appropriate channel (e.g email, sms, in response)
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    roles: [{}],
    mobileNo: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
    },
    mobileNoVerified: {
      type: Boolean,
    },
    postcode: {
      type: String,
      required: true,
      trim: true,
    },
    line1: {
      type: String,
      required: true,
      trim: true,
    },
    line2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    dataPriviledges: [
      {
        type: {
          type: String,
          enum: DATA_PRIVILEDGES_TYPE,
        },
        businessId: String,
      },
    ],
  },
  { timestamps: true }
);

// Code for Encrypting the Password, Generating the salt and for Password comparison
function onSaveMiddleware(next) {
  if (this.isModified("password") || this.isNew) {
    this.password = bcrypt.hashSync(this.password);
  }
  next();
}

UserSchema.pre("save", onSaveMiddleware);

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.generatePassword = function () {
  return generatePassword();
};

UserSchema.statics.isEmailAvailable = async (email) => {
  try {
    let user = await this.findOne({ email });
    if (user) {
      throw new Error("Email already already taken");
    }
    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

module.exports = mongoose.model("User", UserSchema);
