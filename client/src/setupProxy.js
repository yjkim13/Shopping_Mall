const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://https://frozen-cove-46738.herokuapp.com',
            changeOrigin: true,
        })
    );
};