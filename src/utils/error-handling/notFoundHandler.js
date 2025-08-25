const notFoundHandler = (req, res, next) => {
  return next(new Error("Not found Handler!!", { cause: 404 }));
};

export default notFoundHandler;