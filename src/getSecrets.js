const AWS = require("aws-sdk");

const secretsmanagerError = (err) => ({
  statusCode: err.statusCode,
  message: err.code,
});
module.exports = (SecretId, region = "eu-west-1") => {
  const secretsmanager = new AWS.SecretsManager({ region });
  const params = {
    SecretId,
  };
  return secretsmanager
    .getSecretValue(params)
    .promise()
    .then(exractSecretString)
    .catch((err) => {
      console.log(err);
      return Promise.reject(secretsmanagerError(err));
    });
};
const exractSecretString = ({ SecretString }) => JSON.parse(SecretString);
