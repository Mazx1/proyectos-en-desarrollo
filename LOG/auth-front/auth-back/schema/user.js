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
userSchema.pre('save', async function(next) {
    if (this.isModified("password") || this.isNew) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            return next();
        } catch (error) {
            return next(error);
        }
    }
    return next();
});

userSchema.statics.usernameExists = async function(username){
    //const result = await Mongoose.model('User').find({username});
    const result = await this.find({username});
    return result.length > 0;
};

userSchema.methods.comparePassword = async function(password){      
    const same = await bcrypt.compare(password, this.password);
    return same;  
};
userSchema.methods.createAccessToken = function(){
    return generateAccessToken(getUserInfo(this));
};
userSchema.methods.createRefreshToken = async function(){
    try {
        const refreshToken = generateRefreshToken(getUserInfo(this));
        await new Token({token: refreshToken}).save();
        return refreshToken;
    } catch (error) {
        console.error('Error saving refresh token:', error);
    }
};
module.exports = Mongoose.model('User', userSchema);