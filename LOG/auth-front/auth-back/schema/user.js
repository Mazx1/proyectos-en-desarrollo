const Mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Token = require('../schema/token');   

const userSchema = new Mongoose.Schema({
    id:{type: Object},
    username:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    name:{type: String, required: true},

});
//mongodb+srv://manuel:<db_password>@cluster0.0ce0ooa.mongodb.net/?appName=Cluster0
userSchema.pre('save', function(next) {
    if (this.isModified("password") || this.isNew) {
        const document = this;

        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            } else {
                document.password = hash;
                return next();
            }
        });
    } else {
        return next();
    }
});

userSchema.methods.usernameExists = async function(username){
    const result = await Mongoose.model('User').find({username});

    return result.length > 0;
};

userSchema.methods.comparePassword = async function(password){      
    const same = await bcrypt.compare(password, hash);

    return same;  
};
userSchema.methods.createAccessToken = function(){
    return generateAccessToken(getUserInfo(this));
};
userSchema.methods.createRefreshToken = async function(){
    return refreshToken= generateRefreshToken(getUserInfo(this));
    try {
        await new Token({token: refreshToken}).save();
        return refreshToken;
    } catch (error) {
        console.error('Error saving refresh token:', error);
    }
};
module.exports = Mongoose.model('User', userSchema);