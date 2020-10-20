module.exports = {
    devServer: {
        proxy: {
            '/socket.io': {
                target: process.env.VUE_APP_BASE_URL,
                ws: true,
                changeOrigin: true,
            }
        }
    }
}