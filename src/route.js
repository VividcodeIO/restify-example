const restify = require('restify');

const server = restify.createServer();

const logHandler = (req, res, next) => {
  console.log('req: %s, params: %s', req.href(), JSON.stringify(req.params));
  res.send(req.params);
  return next();
};

server.get('/route/simple', logHandler);
server.get('/route/user/:id', logHandler);
server.get(/^\/route\/order\/(\d+)/, logHandler);
server.get({
  path: '/route/versioned',
  version: '1.0.0'
}, logHandler);


server.listen(8000, () => console.log('%s listening at %s', server.name, server.url));