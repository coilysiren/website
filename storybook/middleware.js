const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
  if (process.env.NODE_NEV === "production") {
    // 
  } else {
    router.use('/api', proxy({
      target: 'http://localhost:3000',
      changeOrigin: true
    }))  
  }
}
