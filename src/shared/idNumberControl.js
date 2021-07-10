const InvalidIdException = require('./InvalidIdException');

module.exports = (req, res, next) => {
  const requestedId = Number.parseInt(req.params.id);
  if (Number.isNaN(requestedId)) {
    throw new InvalidIdException();
  }
  next();
};