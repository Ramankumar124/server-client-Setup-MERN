

const errorHandler = (
  err,
  req,
  res,
  next
) => {
  if (res.headersSent) return next(err);
  const statusCode = "statusCode" in err ? err.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
