/**
 * 用户实体
 */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: Number,
    userEmail: String,
    userPwd: String,

    createTime: {
        type: Date,
        default: Date.now(),
    },
    lastLoginTime: {
        type: Date,
        default: Date.now(),
    },
    remark: String,
});

module.exports = mongoose.model('users', userSchema, 'users');
