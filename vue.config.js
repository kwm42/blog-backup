module.exports = {
    publicPath: './',

    devServer: {
        proxy: {
            '/api': {
                target: 'http://120.78.122.146:18090',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}