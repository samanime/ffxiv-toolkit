export default class Cache {
  cache = {};

  send = (req, res, next) => {
    const { headers, body } = this.cache[req.path] || {};

    if (headers) {
      Object.entries(headers)
        .forEach(([key, value]) => res.set(key, value));

      res.send(body).end();
    } else {
      next();
    }
  };

  capture = (req, res, next) => {
    if (res.body) {
      this.cache[req.path] = {
        headers: res.getHeaders(),
        body: res.body
      };
    }

    next();
  };
}