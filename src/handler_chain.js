const restify = require('restify');

const server = restify.createServer();

server.pre((req, res, next) => {
  console.log('req: %s', req.href());
  return next();
});

server.use(restify.plugins.queryParser());

server.use((req, res, next) => {
  req.headers.accept = 'application/json';
  return next();
});

server.get('/handler_chain', [(req, res, next) => {
  res.header('X-Test', 'test');
  return next();
}, (req, res, next) => {
  if (req.query.boom) {
    return next(new Error('boom!'));
  }
  res.send({
    msg: 'handled!'
  });
  return next();
}]);

server.listen(8000, () => console.log('%s listening at %s', server.name, server.url));