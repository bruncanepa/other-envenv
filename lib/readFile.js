const fs = require('fs');
const path = require('path');

module.exports = function(absolutePath) {
  return fs.readFileSync(absolutePath, 'utf8');
};
