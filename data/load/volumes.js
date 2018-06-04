module.exports = (__) => {
  const {docker} = __;
  return new Promise((resolve, reject) => {
    docker.listVolumes({all: true}, function(err, volumes) {
      if(err) {
        reject(err);
      } else {
        resolve(volumes);
      }
    });
  });
}