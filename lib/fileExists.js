const fs = require('fs');
const path = require('path');

function fileExists(file) {
  const filePath = path.resolve(__dirname, file);
  return fs.existsSync(filePath);
};

module.exports = fileExists;