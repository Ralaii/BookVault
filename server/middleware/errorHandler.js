export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
}

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
}