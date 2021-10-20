const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', async ({ response }) => {
  response.body = 'Hello world!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, (e) => {
  if (e) {
    console.error(e);
  } else {
    console.log(`OAuth server running at http://localhost:${3000}`);
  }
});
