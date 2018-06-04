const path = require('path');
const loadCompose = require('./composes/compose');

module.exports = (__) => {
  const {projectDir, dockerCompose} = __;
  return new Promise((resolve, reject) => {
    const file = path.join(projectDir, 'docker-compose.yml');
    __ = {...__, file};
    const composes = [];
    loadCompose(__)
      .then((compose) => {
        if(compose) {
          composes.push(compose);
        }
        resolve(composes);
      });
  });
}
