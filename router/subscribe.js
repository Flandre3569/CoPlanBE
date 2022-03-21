const Router = require('@koa/router');
const { subscribe } = require('../controller/subscribe');

const subscribeRouter = new Router();


subscribeRouter.post('/subscribe', subscribe);

module.exports = subscribeRouter;