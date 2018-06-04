const {loadComposes} = require('../../../data/composes');

module.exports = (__) => {
  const {docker, emit} = __;
        
  docker.listImages({all: true}, function(err, images) {
    if(err) {
      console.error(err);
    } else {
      emit('images', images);
    }
  });

  docker.listContainers({all: true}, function(err, containers) {
    if(err) {
      console.error(err);
    } else {
      emit('containers', containers);
    }
  });

  loadComposes(__)
    .then((composes) => {
      emit('composes', composes);
    })
    .catch((err) => {
      console.error(err);
    });
  
};