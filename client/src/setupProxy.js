const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "proxy": "http://localhost:4390/",
            changeOrigin: true,
        })
    );
};