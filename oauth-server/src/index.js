const Koa = require('koa');
const Router = require('@koa/router');

require('dotenv').config();

const app = new Koa();
const router = new Router();

const ZOOM_OAUTH_BASE_URI = 'https://zoom.us/oauth/';

router.get('/', ({ response }) => {
  response.body = '<a href="/install">Get Zoom OAuth token</a>';
});

router.get('/install', ({ response }) => {
  response.redirect(
    `${ZOOM_OAUTH_BASE_URI}authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`,
  );
});

router.get('/redirect', ({ request, response }) => {
  const code = request.query.code;

  if (code) {
    response.body = `OAuth token: ${code}`;
  } else {
    response.redirect('/');
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.SERVER_PORT, (e) => {
  if (e) {
    console.error(e);
  } else {
    console.log(
      `OAuth server running at http://localhost:${process.env.SERVER_PORT}`,
    );
  }
});
