const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware(['/oauth'], { target: 'https://oauth.kinkorn.pongpich.xyz' }));
  app.use(createProxyMiddleware(['/api'], { target: 'https://api.kinkorn.pongpich.xyz' }));
};
