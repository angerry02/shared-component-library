const AWS = require("aws-sdk");
const raiseEvents = require("../../src/raiseEvents");

const { mockPromiseFn } = require("../testHelpers/jestHelpers");

const mockEventBridge = mockPromiseFn();

const returnEventSuccess = {
  FailedEntryCount: 0,
  Entries: [
    {
      EventId: "EventId",
    },
  ],
};
const returnEventFailed = {
  FailedEntryCount: 1,
  Entries: [
    {
      ErrorCode: "ErrorCode",
      ErrorMessage: "ErrorMessage",
    },
  ],
};

AWS.EventBridge = jest.fn().mockImplementation(() => ({
  putEvents: mockEventBridge,
}));

const eventEntries = {
  Source: "Source",
  DetailType: "transaction",
  EventBusName: "EventBusName",
};
const eventDetails = {
  id: "id",
  prop: "prop",
};

describe("Test for raiseEvent function", () => {
  test("returns test secrets", async () => {
    expect.assertions(2);

    mockEventBridge.promise.mockResolvedValueOnce(returnEventSuccess);
    const response = await raiseEvents(eventEntries, eventDetails);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(returnEventSuccess.Entries);
  });
  test("returns error when eventbridge return FailedEntryCount higher then 0", async () => {
    expect.assertions(2);

    mockEventBridge.promise.mockResolvedValueOnce(returnEventFailed);

    delete eventEntries.Source;
    await raiseEvents(eventEntries, eventDetails).catch((err) => {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe(returnEventFailed.Entries[0]);
    });
  });
});
