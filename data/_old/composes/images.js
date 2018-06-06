const {loadImages} = require('../images');

module.exports = __ => {
  const {compose, services} = __;
  return new Promise((resolve, reject) => {
    try {
      loadImages({...__, compose})
        .then((images) => {
          __.images = images;
          for(const service of services) {
            for(const image of images) {
              let found = false;
              for(const name of image.Names) {
                if(name.indexOf(`/${__.projectName}_${service.name}_`) === 0) {
                  found = true;
                }
              }
              if(found) {
                service.images.push(image);
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