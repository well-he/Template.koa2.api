/**
 * 用户实体
 */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: Number, //用户id，自增长
    userName: String, //用户名
    userPwd: String, //用户密码
    userEmail: String, // 用户邮箱
    mobile: String, // 手机号
    sex: Number, // 性别
    job: String, //岗位
    depId: [],
    role: {
        type: Number,
        default: 1, //用户角色 0 系统管理员, 1 普通用户
    },
    state: {
        type: Number,
        default: 1, //1在职，2离职，3试用期
    },
    roleList: [], //系统角色

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

//mongoose.model 第一个参数为model的名字，第二个为定义的schema,第三个为数据库中collection名称
module.exports = mongoose.model('users', userSchema, 'users');
