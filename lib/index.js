const fs = require('fs');

const ERROR_MESSAGE = 'File does not exist';

function updateEnv({key, value, addedVariables}) {
  process.env[key] = value;
  addedVariables[key] = value;
};

function getEnv(absolutePath, {force = false}) {
  const file = fs.readFileSync(absolutePath, 'utf8');
  const notAddedVariables = {};
  const addedVariables = {};
  
  file.split('\n').forEach(function(line) {
    const [key, value] = line.split('=');
    if (process.env[key] !== undefined) {
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

function envenv(absolutePath, options = {}) {
  if (options.check) {
    if (fs.existsSync(absolutePath)) {
      return getEnv(absolutePath, options);
    } else {
      return {success: false, message: ERROR_MESSAGE};
    }
  } else {
    return getEnv(absolutePath, options);
  }
};

module.exports = envenv;