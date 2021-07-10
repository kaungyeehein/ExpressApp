module.exports = (err, req, res, next) => {
  const { status, message, errors } = err;
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((errors) => {
      validationErrors[errors.param] = errors.msg;
    });
  }
  res
    .status(status)
    .send({
      message: message,
      timestamp: Date.now(),
      path: req.originalUrl,
      validationErrors
    });
}