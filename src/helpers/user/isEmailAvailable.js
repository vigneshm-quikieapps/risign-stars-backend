const User = require("../../models/User");

const isEmailAvailable = email => {
    return User.find({email}).then(user => {
        if (user) {
            return Promise.reject('Email already already taken');
        }
    })
}

module.exports = isEmailAvailable