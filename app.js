const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const log4js = require('./utils/logger');
const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

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
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    log4js.error(`${err.stack}`);
});

module.exports = app;
