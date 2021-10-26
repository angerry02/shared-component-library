// Decodes error messages
const decodeApiError = (err) => {
  if (!err) {
    return "Unknown server error";
  }

  if (err.response && err.response.data) {
    // Prefer more detailed error message if available
    if (err.response.data.details) {
      return err.response.data.details;
    }

    // Fall back to simple error message
    if (err.response.data.message) {
      return err.response.data.message;
    }

    // There can also be an "error" error
    if (err.response.data.error) {
      return err.response.data.error;
    }
    // There can be a statusText
    if (err.response.statusText) {
      return err.response.statusText;
    }
  }
  // Default to generic HTTP error message
  return err.message;
};

const decodeHeader = (err) =>
  err.response ? err.response.headers : err.headers;

const decodeMethod = (err) => (err.response ? err.response.method : "");

const decodeMessage = (resp) =>
  resp.response ? decodeApiError(resp) : "Success";

const decodeStatusCode = (resp) =>
  resp.response ? resp.response.status : resp.status;

const decodeBody = (resp) => (resp.status ? resp.data : "");

module.exports = {
  decodeHeader,
  decodeMethod,
  decodeMessage,
  decodeStatusCode,
  decodeBody,
};
