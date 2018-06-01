module.exports = {
  loadImages
}

function loadImages(__) {
  const {docker} = __;
  return new Promise((resolve, reject) => {
    docker.listImages({all: true}, function(err, images) {
      if(err) {
        reject(err);
      } else {
        resolve(images);
      }
    });
  });
}