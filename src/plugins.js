const restify = require('restify');

const server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());

server.post('/plugins', (req, res, next) => {
  console.log(req.body);
  res.send({a: 1});
  return next();
});

server.listen(8000, () => console.log('%s listening at %s', server.name, server.url));