const User = require('../model/userSchema');
const {success, fail} = require('../utils/util');
const log = require('../utils/logger');
const util = require('../utils/util');

class UserController {
    //登录
    static async getUserByUserName(ctx) {
        try {
            const {userName, userPwd} = ctx.request.body;
            log.info(`用户登录:[userName:${userName},password:${userPwd}]`);
            const user = await User.findOne({
                userName,
                userPwd,
            });

            if (user) {
                ctx.body = success(user, '登录成功');
            } else {
                ctx.body = fail('账号或密码不正确');
            }
        } catch (error) {
            ctx.body = fail(error.msg);
            log.error(error.msg);
        }
    }

    //注册
    static async registry(ctx) {
        try {
            const {userName, userPwd, userEmail, mobile} = ctx.request.body;
            log.info(`注册用户信息:[userName:${userName}, password:${userPwd}]`);

            const check = await User.findOne({
                userName,
            });
            if (check) {
                ctx.body = fail('用户信息已存在', util.CODES.USER_ACCOUNT_EXIST, userName);
                return;
            }

            let user = new User({
                userName: userName,
                userPwd: userPwd,
                userEmail: userEmail,
                sex: '',
                mobile: '',
            });
            user = await user.save();
            ctx.body = success(user, '注册成功');
        } catch (error) {
            ctx.body = fail(error.msg);
            log.error(error.msg);
        }
    }

    //修改密码
    static async modifyPwd(ctx) {
        try {
            const {userName, userPwd} = ctx.request.body;
            log.info(`用户[${userName}]修改密码`);
            const res = await User.updateOne({userName: userName}, {userPwd: userPwd});
            if (res) {
                ctx.body = success(res, '修改成功');
            } else {
                ctx.body = fail('修改密码失败!');
            }
        } catch (err) {
            ctx.body = fail(err.msg);
            log.error(err.msg);
        }
    }

    static async users(ctx) {
        try {
            const res = await User.find({});
            if (res) {
                ctx.body = success(res, '查询成功');
            } else {
                ctx.body = fail('查询失败!');
            }
        } catch (error) {
            ctx.body = fail(err.msg);
            log.error(err.msg);
        }
    }
}

module.exports = UserController;
