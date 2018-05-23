const fs = require('fs');
const path = require('path');

module.exports = function(name) {
  const file = path.resolve(__dirname, name);
  return fs.readFileSync(file, 'utf8');
};
