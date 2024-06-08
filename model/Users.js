const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,   // delete the spaces between string
        minlength:5,
        maxlength:20,

    },
    email:{
        type:String,
        required:true,
        trim:true,   
        minlength:5,
        maxlength:20,
        unique:true,          
    },
    password:{
        type:String,
        required:true,
        trim:true,   
        minlength:8,
        maxlength:100,         
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png", // صوره البروفايل من pixabay => user avatar
            publicId: null,
        }
    },
    bio:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,

    /*child:{
        type:mongoose.Schema.ObjectId,
        ref: 'Child',
    }*/

},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
})

UserSchema.virtual("childs", {
    ref: "Child",
    foreignField: "user",
    localField: "_id",
});


// Generate Auth Token
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
}

/*UserSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'child',
      select: 'name birthday',
    }).populate({
      path: 'cartItems.product',
      select: 'title imageCover ',
    });
  
    next();
  });*/


// User Model
const User = mongoose.model("User", UserSchema);
module.exports= {
    User,
}