const { makeRequest } = require("./src/axios");
const getSecrets = require("./src/getSecrets");
const raiseEvents = require("./src/raiseEvents");
const { makeResponse, handleError } = require("./src/response");
const {
  validatePersonalNumber,
  validateEmail,
  validateOrgNumber,
  validateLoanTerm,
  validateLoanAmount,
} = require("./src/validators");

const {
  getCurrency,
  formatNumber,
  formatNumberWithCurrency,
} = require("./src/currency");

module.exports = {
  makeRequest,
  getSecrets,
  raiseEvents,
  makeResponse,
  handleError,
  validateEmail,
  validateOrgNumber,
  validateLoanTerm,
  validatePersonalNumber,
  validateLoanAmount,
  getCurrency,
  formatNumber,
  formatNumberWithCurrency,
};
