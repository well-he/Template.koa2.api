const Koa = require('koa');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const log4js = require('./utils/logger');
const users = require('./routes/users');
const router = require('koa-router')();

const app = new Koa();
// error handler
onerror(app);

require('./config/db');

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
);
app.use(json());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
    await next();
    log4js.info(`${ctx.method} ${ctx.url} - ${ctx.response.status}`);
});

// routes
router.prefix('/api'); //一级路由
router.use(users.routes(), users.allowedMethods());
//挂载二级路由
app.use(router.routes(), router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    log4js.error(`${err.stack}`);
});
module.exports = app;
