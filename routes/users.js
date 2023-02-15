/**
 * 用户管理模块
 */
const router = require('koa-router')();
const UserController = require('../controller/userController');
router.prefix('/users');

router
    .get('/', UserController.users)
    .put('/password', UserController.modifyPwd)
    .post('/login', UserController.getUserByUserName)
    .post('/registry', UserController.registry);

module.exports = router;
