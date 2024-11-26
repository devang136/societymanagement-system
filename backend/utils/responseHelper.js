const sendResponse = (res, statusCode, data, message = '') => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: 'error',
    message
  });
};

module.exports = {
  sendResponse,
  sendError
};