module.exports = (__) => {
  const {docker} = __;
  return new Promise((resolve, reject) => {
    docker.listContainers({all: true}, function(err, containers) {
      if(err) {
        reject(err)
      } else {
        resolve(containers)
      }
    });
  });
}