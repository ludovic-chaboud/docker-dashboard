module.exports = (__) => {
  const {docker} = __;
  return new Promise((resolve, reject) => {
    docker.listNetworks({all: true}, function(err, networks) {
      if(err) {
        reject(err);
      } else {
        resolve(networks);
      }
    });
  });
}