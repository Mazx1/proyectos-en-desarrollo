import moose from 'mongoose';

const validRoles = [ 'superman' ,'admin', 'user'];

const userSchema = new moose.Schema({
    name: {
        type: String,   
        required: [true, 'Name is required']
    },
    email: {                
        type: String,   
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },  
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: validRoles
    }
});

export default moose.model('User', userSchema);