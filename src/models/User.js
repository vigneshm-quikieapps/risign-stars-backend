const mongoose = require("mongoose");
const { DATA_PRIVILEGES_TYPE } = require("../contants/constant");
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
      default: false,
    },
    mobileNoVerified: {
      type: Boolean,
      default: false,
    },
    postcode: {
      type: String,
      trim: true,
    },
    addressLine1: {
      type: String,
      trim: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    dataPrivileges: [
      {
        type: {
          type: String,
          enum: DATA_PRIVILEGES_TYPE,
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
      throw new Error("Email already taken");
    }
    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

module.exports = mongoose.model("User", UserSchema);
