const {
  decodeHeader,
  decodeMethod,
  decodeMessage,
  decodeStatusCode,
  decodeBody,
} = require('./decodeResponses')

// Checks in searched value is not null
const exists = value => value != null

// If it extraProperty exits, add that property on the response
const addsExtraProperty = (resp, succesResponse, extraProperty) => {
  return exists(extraProperty)
  ? succesResponse.property = resp[extraProperty]
  : succesResponse
}

const buildResponse = (resp, extraProperty) => {
  const succesResponse =
  { 
    statusCode: decodeStatusCode(resp),
    message: decodeMessage(resp),
    body: decodeBody(resp),
  }
  addsExtraProperty(resp, succesResponse, extraProperty)
  return succesResponse
}
  
const buildFailResponse = resp => {
  const error = buildResponse(resp)
  error.headers = decodeHeader(resp)
  error.method = decodeMethod(resp)
  return error
}
  
const errorMessageResponse = err => (
  err.message && !err.response
  ? err = { message: err.message }
  : buildFailResponse(err) 
)

module.exports = {
  buildResponse,
  errorMessageResponse,
}