const middlewaresErrors = (err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
};

module.exports = middlewaresErrors;
