const util = require('util');
const restify = require('restify');

const server = restify.createServer({
  formatters: {
    'application/base64': (req, res, body) => {
      if (body instanceof Error) {
        return body.stack;
      }
      if (Buffer.isBuffer(body)) {
        return body.toString('base64');
      }
      if (typeof body === 'string') {
        return new Buffer(body).toString('base64');
      }
      return util.inspect(body);
    }
  }
});

server.get('/content', (req, res, next) => {
  res.send('Hello World');
  next();
});

server.listen(8000, () => console.log('%s listening at %s', server.name, server.url));