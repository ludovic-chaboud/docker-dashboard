const {loadNetworks} = require('./networks');

module.exports = __ => {
  const {compose} = __;
  return new Promise((resolve, reject) => {
    loadNetworks({...__, compose})
      .then((networks) => {
        __.networks = networks;
        for(const service of services) {
          for(const network of networks) {
            let found = false;
            for(const name of network.Names) {
              if(name.indexOf(`/${__.projectName}_${service.name}_`) === 0) {
                found = true;
              }
            }
            if(found) {
              service.networks.push(network);
            }
          }
        }
        resolve(compose);
      });
  });
}