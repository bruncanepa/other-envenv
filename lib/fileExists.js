const fs = require('fs');
const path = require('path');

function fileExists(absolutePath) {
  return fs.existsSync(absolutePath);
};

module.exports = fileExists;