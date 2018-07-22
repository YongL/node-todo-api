var mongoose = require('mongoose');
const User = mongoose.model('todoDb', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = {User};

