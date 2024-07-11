// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://chc27y6zqk.execute-api.eu-west-1.amazonaws.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // Supprime "/api" de l'URL
            },
        })
    );

    app.use(
        '/upload-api',
        createProxyMiddleware({
            target: 'https://chc27y6zqk.execute-api.eu-west-1.amazonaws.com/nonprod/analyze', // Remplacez par votre URL de l'API d'upload
            changeOrigin: true,
            pathRewrite: {
                '^/upload-api': '', // Supprime "/upload-api" de l'URL
            },
        })
    );
};
