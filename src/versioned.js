const restify = require('restify');

const server = restify.createServer();

server.get({
  path: '/versioned',
  version: '1.0.0',
}, (req, res, next) => {
  res.send('V1');
  return next();
});

server.get({
  path: '/versioned',
  version: ['2.0.0', '2.1.0', '2.2.0'],
}, (req, res, next) => {
  res.send({
    requestedVersion: req.version(),
    matchedVersion: req.matchedVersion(),
  });
  return next();
});

server.listen(8000, () => console.log('%s listening at %s', server.name, server.url));