const AWS = require("aws-sdk");
const getSecrets = require("../../src/getSecrets");

const { mockPromiseFn } = require("../testHelpers/jestHelpers");

const mockSecretManager = mockPromiseFn();

const returnSecrets = {
  ARN: "ARN",
  Name: "test/secretName",
  VersionId: "Version1",
  SecretString:
    '{"testApiClientId":"testApiClientId","testApiSecret":"testApiSecret"}',
  VersionStages: ["AWSCURRENT"],
  CreatedDate: "2020-06-12T08:46:14.725",
};
const returnResourceNotFound = {
  code: "ResourceNotFoundException",
  time: "2020-06-15T14:46:54.480Z",
  requestId: "36d964f2-00be-4a2d-b079-262c7a36061b",
  statusCode: 400,
  retryable: false,
  retryDelay: 66.77033671731205,
};

AWS.SecretsManager = jest.fn().mockImplementation(() => ({
  getSecretValue: mockSecretManager,
}));

describe("Test for getSecrets function", () => {
  test("returns test secrets", async () => {
    expect.assertions(2);
    mockSecretManager.promise.mockResolvedValueOnce(returnSecrets);
    const response = await getSecrets("test");
    expect(response.testApiClientId).toBe("testApiClientId");
    expect(response.testApiSecret).toBe("testApiSecret");
  });
  test("returns ResourceNotFoundException", async () => {
    expect.assertions(2);
    mockSecretManager.promise.mockRejectedValueOnce(returnResourceNotFound);
    await getSecrets().catch((err) => {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe("ResourceNotFoundException");
    });
  });
});
