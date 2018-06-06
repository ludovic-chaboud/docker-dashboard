const {loadContainers} = require('../containers');

module.exports = __ => {
  const {compose, services} = __;
  return new Promise((resolve, reject) => {
    try {
      loadContainers({...__, compose})
        .then((containers) => {
          __.containers = containers;
          for(const service of services) {
            for(const container of containers) {
              let found = false;
              for(const name of container.Names) {
                if(name.indexOf(`/${__.projectName}_${service.name}_`) === 0) {
                  found = true;
                }
              }
              if(found) {
                service.containers.push(container);
              }
            }
          }
          resolve(compose);
        })
        .catch(e => {
          reject(e);
        })
    } catch(e) {
      reject(e);
    }
  });
}