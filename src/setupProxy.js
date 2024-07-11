const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // Proxy pour les requêtes de login
    app.use(
        '/api/login', // Endpoint pour le login
        createProxyMiddleware({
            target: 'https://chc27y6zqk.execute-api.eu-west-1.amazonaws.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api/login': '/login' // Redirige vers /login sur l'API cible
            }
        })
    );

    // Proxy pour les requêtes d'analyse asynchrone
    app.use(
        '/api/analyze', // Endpoint pour l'analyse asynchrone
        createProxyMiddleware({
            target: 'https://chc27y6zqk.execute-api.eu-west-1.amazonaws.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api/analyze': '/nonprod/analyze/async' // Redirige vers /nonprod/analyze/async sur l'API cible
            }
        })
    );
};
