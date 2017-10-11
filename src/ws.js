const fs = require('fs');
const restify = require('restify');
const server = restify.createServer();
const io = require('socket.io')(server.server);

server.get('/', (req, res, next) => {
  fs.readFile(__dirname + '/index.html', function (err, data) {
    if (err) {
      next(err);
      return;
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(data);
    next();
  });
});

io.on('connection',(socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', console.log);
});

server.listen(8000, () => console.log('socket.io server listening at %s', server.url));