const basicRequest = {
  method: "GET",
  url: "https://wp.qred.qredson/bank",
};

const expectedSuccesResponse = {
  statusCode: 200,
  message: "Success",
  body: {
    name: "Qred",
    description: "Företagslån utan krångel med banken",
  },
};

const axiosMockSuccesResponse = {
  status: 200,
  statusText: "OK",
  data: {
    name: "Qred",
    description: "Företagslån utan krångel med banken",
  },
};

const basicFailResponse = (message) => ({
  statusCode: 400,
  method: "GET",
  message,
  body: "",
  headers: {
    Accept: "text/json",
  },
});

const axiosMockErrorResponse = (data) => ({
  response: {
    status: 400,
    statusText: "THere could be statusText",
    method: "GET",
    data,
    headers: {
      Accept: "text/json",
    },
  },
});

const mockErrorResponseWithoutResponseObject = {
  message: "Default to generic HTTP error message",
};

module.exports = {
  axiosMockSuccesResponse,
  basicRequest,
  expectedSuccesResponse,
  basicFailResponse,
  mockErrorResponseWithoutResponseObject,
  axiosMockErrorResponse,
};
