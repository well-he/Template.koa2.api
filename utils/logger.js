/**
 * 日志存储
 */

const log4js = require('log4js');

const levels = {
    trace: log4js.levels.TRACE,
    debug: log4js.levels.DEBUG,
    info: log4js.levels.INFO,
    warn: log4js.levels.WARN,
    error: log4js.levels.ERROR,
    fatal: log4js.levels.FATAL,
};

log4js.configure({
    appenders: {
        //追加器
        console: {
            type: 'console',
        },
        info: {
            type: 'file',
            filename: 'logs/all-logs.log',
        },
        error: {
            type: 'dateFile',
            filename: 'logs/log',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'debug',
        },
        info: {
            appenders: ['info', 'console'],
            level: 'info',
        },
        error: {
            appenders: ['error'],
            level: 'error',
        },
    },
});
/**
 * debug的日志输出，level为debug
 * @param {
 * *} content
 */
exports.debug = content => {
    let logger = log4js.getLogger();
    logger.level = levels.debug;
    logger.debug(content);
};
/**
 * debug的日志输出，level为error
 * @param {
 * *} content
 */
exports.error = content => {
    let logger = log4js.getLogger('error'); //指定追加器,默认为default
    logger.level = levels.error;
    logger.error(content);
};

/**
 * debug的日志输出，level为info
 * @param {
 * *} content
 */
exports.info = content => {
    let logger = log4js.getLogger('info');
    logger.level = levels.info;
    logger.info(content);
};
