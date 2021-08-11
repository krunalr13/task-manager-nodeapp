const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 7,  // password length should be at least 7 
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    age : {
        type : Number,
        validate(value) {
            if(value < 0)
            throw new Error('Age must be a positive number');
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
    avatar :{
        type : Buffer
    }
}, {
    timestamps : true
});

// to establish relationship between two collections
userSchema.virtual('tasks', {
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
});

// methods on instance of user model
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = await jwt.sign({ _id : user._id.toString()}, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

// model method (available on model itself)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Delete user tasks when user is removed 
userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({owner : user._id});
    next();
})
const User = mongoose.model('User', userSchema);

module.exports = User;