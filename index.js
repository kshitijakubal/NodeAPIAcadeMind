const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

// Using http, create server
let server = http.createServer(app);
    

server.listen(port,'127.0.0.1');