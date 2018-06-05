const path = require('path');
const loadCompose = require('./composes/compose');

module.exports = (__) => {
  const {projectDir, dockerCompose} = __;
  return new Promise((resolve, reject) => {
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
