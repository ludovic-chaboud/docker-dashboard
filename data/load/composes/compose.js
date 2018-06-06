const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = (__) => {
  const {dockerComposeFile} = __;
  return new Promise((resolve, reject) => {
    console.log(dockerComposeFile)
    if(fs.existsSync(dockerComposeFile)) {
      const directory = path.dirname(dockerComposeFile);
      const name = path.basename(directory);
      const config = yaml.safeLoad(fs.readFileSync(dockerComposeFile, 'utf-8'));
      resolve({
        name,
        config
      });
    } else {
      resolve(null);
    }
  });
}