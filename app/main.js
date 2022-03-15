const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { errorHandler } = require('../errors/error')
const routerAsync = require('./router');

const app = new Koa()
app.routers = routerAsync;

app.use(bodyParser())
app.routers();
app.on('error', errorHandler)

module.exports = app;