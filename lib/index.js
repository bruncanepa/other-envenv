const readFile = require('./readFile');
const fileExists = require('./fileExists');

const ERROR_MESSAGE = 'File does not exist';

function updateEnv({key, value, addedVariables}) {
  process.env[key] = value;
  addedVariables[key] = value;
};

function getEnv(absolutePath, {force = false}) {
  const addedVariables = {};
  const notAddedVariables = {};
  const file = readFile(absolutePath);
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

function envenv(absolutePath = `${__dirname}/.env`, options = {}) {
  const {check = false} = options;
  if (check) {
    if (fileExists(absolutePath)) {
      return getEnv(absolutePath, options);
    } else {
      return {success: false, message: ERROR_MESSAGE};
    }
  } else {
    return getEnv(absolutePath, options);
  }
};

module.exports = envenv;