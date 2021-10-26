module.exports.mockPromiseFn = () => {
  const promise = jest.fn();
  const fn = jest.fn().mockImplementation(() => ({
    promise,
  }));
  fn.promise = promise;
  return fn;
};
