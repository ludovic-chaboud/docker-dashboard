const DockerEvents = require('docker-events');
const {loadComposes} = require('../../data/composes');

module.exports = (__) => {
  const {docker, emit} = __;
  var emitter = new DockerEvents({
    docker,
  });
  emitter.on("connect", function() {
    emit('docker', 'Connected');
  });
  
  docker.getEvents({}, function (err, data) {
    if(err){
      console.log(err.message);
    } else {
      data.on('data', function (chunk) {
        const txt = JSON.parse(chunk.toString('utf8'));
        emit('docker', txt);
        
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
        
      });
    } 
  });
  
};