const restify = require('restify');

const server = restify.createServer();

server.get('/hello', (req, res, next) => {
  res.send('Hello World');
  return next();
});

server.listen(8000, () => console.log('%s listening at %s', server.name, server.url));