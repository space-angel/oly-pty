const sendSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data: data,
    message: null
  });
};

const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    data: null,
    message: message
  });
};

module.exports = {
  sendSuccess,
  sendError,
}; 