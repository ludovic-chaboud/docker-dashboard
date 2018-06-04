const DockerEvents = require('docker-events');
const _ = require('lodash');

module.exports = (__) => {
  const {docker, emit} = __;
  var emitter = new DockerEvents({
    docker,
  });
  emitter.on("connect", function() {
    emit('docker', 'Connected');
  });
  
  const emitEvents = _.throttle(
    getEmitEvents(__),
    1000
  );

  docker.getEvents({}, function (err, data) {
    if(err){
      console.log(err.message);
    } else {
      data.on('data', emitEvents);
      /*
      data.on('data', function (chunk) {
        const txt = JSON.parse(chunk.toString('utf8'));
        emit('docker', txt);
      });
      */
    } 
  });

};

function getEmitEvents(__) {
  console.log('getEmitEvents');
  return function() {
    console.log('throttle');
    require('./docker/events')(__);
  }
}