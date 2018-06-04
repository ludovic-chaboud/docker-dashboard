const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = (dir) => {
  if(fs.statSync(dir).isDirectory()) {
    const file = path.join(dir, 'docker-compose.yml');
    if(fs.existsSync(file)) {
      const name = path.basename(dir);
      const config = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
      return {
        name,
        config
      };
    }
  }
  return null;
};