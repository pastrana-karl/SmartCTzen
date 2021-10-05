const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      default:'https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png'
    },
    
    username: {
      type: String,
      unique: true,
    },

    userType:{
      type: String,
      default: "Admin",
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      required:true,
      minlength: 8,
    },

    location: {
      type: String,
    },
    
    resetToken: {
      type: String,
    },

    expireToken: {
      type: Date,
    },

    profilePic: {
      type: String,
      default:
        "https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png",
    },

    userType: {
      type: String,
      default: "Administrator",
    },

    onlineStatus: {
      type: String,
    }
  },
  { timestamps: true }
);

//insert slug

// adminSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();

//     this.password = await bcrypt.hash(this.password, 12);
//     this.passwordConfirm = undefined;
//     next();
// });

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  adminPassword
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

adminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime()) / 1000;

    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// module.exports = mongoose.model("Admin", adminSchema);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
