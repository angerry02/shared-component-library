const AWS = require("aws-sdk");
// const { trace } = require("./utils/utils");

const createParams = ({ Source, EventBusName, DetailType }, details) =>
  Promise.resolve({
    Entries: [
      {
        // Event envelope fields
        Source,
        EventBusName,
        DetailType,
        Time: new Date(),

        // Main event body
        Detail: JSON.stringify(details),
      },
    ],
  });

const sendEvent = (params, region = "eu-west-1") => {
  const eventbridge = new AWS.EventBridge({ region });
  return eventbridge.putEvents(params).promise();
};

const verifyEventSuccess = ({ FailedEntryCount, Entries }) =>
  FailedEntryCount < 1
    ? Promise.resolve({ statusCode: 201, body: Entries })
    : Promise.reject({
        statusCode: 400,
        message: Entries[0],
      });

module.exports = (entries, details, region) =>
  createParams(entries, details)
    .then(sendEvent)
    .then(verifyEventSuccess)
    .catch((err) => Promise.reject(err));
