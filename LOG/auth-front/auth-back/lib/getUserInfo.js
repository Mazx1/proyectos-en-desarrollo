function getUserInfo(user){
    return{
        username: user.username,
        name: user.name,
        Id: user._id
    };
}

module.exports = getUserInfo;