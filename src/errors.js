const restify = require('restify');
const errors = require('restify-errors');

const server = restify.createServer();

server.get('/error/500', (req, res, next) => {
  res.send(new errors.InternalServerError('boom!'));
  return next();
});
server.get('/error/400', (req, res, next) => next(new errors.BadRequestError('bad request')));
server.get('/error/404', (req, res, next) => next(new errors.NotFoundError('not found')));

server.on('NotFound', (req, res, err, cb) => {
  console.error('404 %s', req.href());
  return cb();
});

server.on('InternalServer', (req, res, err, cb) => {
  console.error('should not appear');
  return cb();
});

server.listen(8000, () => console.log('%s listening at %s', server.name, server.url));