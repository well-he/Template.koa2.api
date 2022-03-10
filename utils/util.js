/**
 * 通用工具函数
 */
const logger = require('./logger');
const CODES = {
    SUCCESS: 200,
    PARAM_ERROR: 10001, //参数错误
    USER_ACCOUNT_ERROR: 20001, //用户账号密码错误
    USER_ACCOUNT_EXIST: 20002, //用户账号已存在
    USER_LOGIN_ERROR: 30001, //用户未登录
    BUSINESS_ERROR: 40001, //业务请求失败
    AUTH_ERROR: 50001, //认证失败或TOKEN过期
};
module.exports = {
    /**
     * 分页结构封装
     * @param {number} pageNum
     * @param {number} pageSize
     */
    pager({ pageNum = 1, pageSize = 10 }) {
        pageNum *= 1;
        pageSize *= 1;
        const skipIndex = (pageNum - 1) * pageSize;
        return {
            page: {
                pageNum,
                pageSize,
            },
            skipIndex,
        };
    },
    success(data = '', msg = '', code = CODES.SUCCESS) {
        logger.debug(data);
        return {
            code,
            msg,
            data,
        };
    },
    fail(msg = '', code = CODES.BUSINESS_ERROR, data = '') {
        logger.debug(msg);
        return {
            code,
            msg,
            data,
        };
    },
};
