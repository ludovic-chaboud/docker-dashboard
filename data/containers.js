module.exports = {
  loadContainers
}

function loadContainers(__) {
  const {docker} = __;
  return new Promise((resolve, reject) => {
    try {
      docker.listContainers({all: true}, function(err, containers) {
        if(err) {
          reject(err)
        } else {
          resolve(containers)
        }
      });
    } catch(e) {
      reject(e);
    }
  });
}