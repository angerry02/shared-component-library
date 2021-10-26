const trace = (label, transform) => (data) => {
  const show =
    transform && typeof transform === "function" ? transform(data) : data;
  console.log(label, JSON.stringify(show, null, 2));
  return data;
};

module.exports = {
  trace,
};
