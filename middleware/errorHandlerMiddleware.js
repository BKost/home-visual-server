const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({ msg: "Something went wrong - error handler" });
};

module.exports = errorHandlerMiddleware;
