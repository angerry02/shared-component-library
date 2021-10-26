const mockAxios = require("axios");
const { makeRequest } = require("../../../src/axios");
const {
  axiosMockSuccesResponse,
  basicRequest,
  expectedSuccesResponse,
  basicFailResponse,
  mockErrorResponseWithoutResponseObject,
  axiosMockErrorResponse,
} = require("./fixtures");

jest.mock("axios");
beforeEach(() => {
  mockAxios.mockReset();
});

describe("Test makeRequest function happy path", () => {
  test("returns statusCode 200", async () => {
    mockAxios.mockReturnValueOnce(axiosMockSuccesResponse);
    const response = await makeRequest(basicRequest);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(expectedSuccesResponse).toMatchObject(response);
  });
  test("returns specific response property", async () => {
    axiosMockSuccesResponse.company = {
      id: "55560080-5980",
    };
    expectedSuccesResponse.property = {
      id: "55560080-5980",
    };
    mockAxios.mockReturnValueOnce(axiosMockSuccesResponse);
    const response = await makeRequest(basicRequest, "company");
    console.log(response);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(expectedSuccesResponse).toMatchObject(response);
  });
});

describe("Test decodeApiError function", () => {
  test.each`
    decodedError                                         | dataProperty
    ${"fallback to simple error message"}                | ${{ message: "fallback to simple error message" }}
    ${'There can also be an "error" error'}              | ${{ error: 'There can also be an "error" error' }}
    ${"Prefer more detailed error message if available"} | ${{ details: "Prefer more detailed error message if available" }}
    ${"THere could be statusText"}                       | ${{ details: "THere could be statusText" }}
  `("Returns $decodedError", async ({ decodedError, dataProperty }) => {
    expect.assertions(2);
    mockAxios.mockRejectedValueOnce(axiosMockErrorResponse(dataProperty));
    const response = await makeRequest(basicRequest).catch((err) => {
      expect(mockAxios).toHaveBeenCalledTimes(1);
      expect(basicFailResponse(decodedError)).toMatchObject(err);
    });
  });
  test("Returns generic HTTP error message", async () => {
    expect.assertions(2);
    mockAxios.mockRejectedValueOnce(mockErrorResponseWithoutResponseObject);
    const response = await makeRequest({
      url: "https://www.qredqqredson.com",
    }).catch((err) => {
      expect(mockAxios).toHaveBeenCalledTimes(1);
      expect(mockErrorResponseWithoutResponseObject).toMatchObject(err);
    });
  });
  test("Return property undefined it no value", async () => {
    axiosMockSuccesResponse.company = undefined;
    expectedSuccesResponse.property = undefined;
    mockAxios.mockReturnValueOnce(axiosMockSuccesResponse);
    const response = await makeRequest(basicRequest, "company");
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(expectedSuccesResponse).toMatchObject(response);
  });
});
