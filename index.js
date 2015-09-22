exports.sanitize = function (data) {
  if (data instanceof Object) {
    for (var key in data) {
      if (/^\$/.test(key)) {
        throw new Error({
          name: 'invalid character in key',
          key: key
        });
        delete data[key];
      } else if (data[key] instanceof Object) {
        exports.sanitize(data[key]);
      }
    }
  }
  return data;
}

module.exports = function (req, res, next) {
  if (req.body) {
    req.body = exports.sanitize(req.body);
  }
  if (req.query) {
    req.query = exports.sanitize(req.query);
  }
  return next();
}
