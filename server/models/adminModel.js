const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },

    email:{
        type:String,
        unique:true,
    },

    password:{
        type:String,
        required:true,
        minlenght: 8,
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, "This field is required"],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords are not the same"
        }
    },

    passwordChangedAt: Date,

    resetToken:{
        type:String,
    },

    expireToken:{
        type:Date,
    },

    profilePic:{
        type:String,
        default:"",
    },
}, 
{ timestamps: true }
);

//insert slug

adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

adminSchema.methods.correctPassword = async function(candidatePassword, adminPassword) {
    return await bcrypt.compare(candidatePassword, adminPassword);
};

adminSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()) / 1000;

        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
