const readFile = require('./readFile');
const fileExists = require('./fileExists');

const ERROR_MESSAGE = 'File does not exist';

function updateEnv({key, value, addedVariables}) {
  process.env[key] = value;
  addedVariables[key] = value;
};

function getEnv(path, {force = false}) {
  const addedVariables = {};
  const notAddedVariables = {};
  const file = readFile(path);
  file
    .split('\n')
    .forEach(function(line) {
      const [key, value] = line.split('=');
      const valueAlreadyExists = process.env[key] !== undefined;
      
      if (valueAlreadyExists) {
        if (force) {
          updateEnv({key, value, addedVariables});
        } else {
          notAddedVariables[key] = value;
        }
      } else {
        updateEnv({key, value, addedVariables});
      }
    });
  return {success: true, addedVariables, notAddedVariables};
};

function envenv(path = `.env`, options = {}) {
  if (fileExists(path)) {
    return getEnv(path, options);
  } else {
    return {success: false, message: ERROR_MESSAGE};
  }
};

module.exports = envenv;