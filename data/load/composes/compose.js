const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = (__) => {
  const {file} = __;
  return new Promise((resolve, reject) => {
    if(fs.existsSync(file)) {
      const directory = path.dirname(file);
      const name = path.basename(directory);
      const config = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
      resolve({
        name,
        config
      });
    } else {
      resolve(null);
    }
  });
}