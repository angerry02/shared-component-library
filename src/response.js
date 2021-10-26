const makeResponse = (statusCode = 500) => (body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  },
  body: typeof body == "string" ? body : JSON.stringify(body),
});

const handleError = (error) => {
  console.log("error:", error);
  return Promise.resolve(
    makeResponse(error === undefined ? (statusCode = 500) : error.statusCode)(
      error === undefined
        ? "Something went wrong"
        : error.message || error.body || error
    )
  );
};

module.exports = {
  makeResponse,
  handleError,
};
