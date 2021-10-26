const axios = require('axios')
const {
  buildResponse,
  errorMessageResponse,
} = require('./utils/buildResponses')

// Second param, "extraProperty" is if you want to extract any data thats not 
// specific in the body, statusCode or method for example
const makeRequest = async (request, extraProperty) => {
  try {
    const resp = await axios(request)
    const successResponse = buildResponse(resp, extraProperty)
    return Promise.resolve(successResponse)
  } catch (err) {
    console.log('Error Request: ', request)
    const errorResponse = errorMessageResponse(err)
    return Promise.reject(errorResponse)
  }
}

module.exports = {
  makeRequest,
}