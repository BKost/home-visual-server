const notFoundMiddleWare = (req, res) => {
  res.status(400).json({ msg: "Route does not exist" });
};

module.exports = notFoundMiddleWare;
