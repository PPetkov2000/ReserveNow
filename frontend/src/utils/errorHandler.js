const errorHandler = (error) => {
  if (error.message) {
    return error.message;
  } else if (Array.isArray(error)) {
    return error[0];
  } else {
    return error;
  }
};

export default errorHandler;
