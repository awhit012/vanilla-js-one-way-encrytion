const http = require('http')
const router = require('./router')

server = http.createServer(router);

server.listen(8080,()=>{
  console.log('Node server created at port 8080');
})


