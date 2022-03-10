/**
 * 用户管理模块
 */
const router = require('koa-router')();
const User = require('../model/userSchema');
const util = require('../utils/util.js');
router.prefix('/users');

router.post('/login', async ctx => {
    try {
        const { userName, userPwd } = ctx.request.body;
        console.log(userName + '---' + userPwd);
        const user = await User.findOne({
            userName,
            userPwd,
        });

        if (user) {
            ctx.body = util.success(user);
        } else {
            ctx.body = util.fail('账号或密码不正确');
        }
    } catch (error) {
        ctx.body = util.fail(error.msg);
    }
});

module.exports = router;
