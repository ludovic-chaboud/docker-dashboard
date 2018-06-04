const DockerEvents = require('docker-events');
const _ = require('lodash');
const load = require('./docker/load');

module.exports = (__) => {
  const {docker, emit} = __;
  var emitter = new DockerEvents({
    docker,
  });
  emitter.on("connect", function() {
    emit('docker', 'Connected');
  });
  
  const loadThrottled = _.throttle(
    () => load(__),
    1000
  );

  docker.getEvents({}, function (err, data) {
    if(err){
      console.log(err.message);
    } else {
      data.on('data', loadThrottled);
      /*
      data.on('data', function (chunk) {
        const txt = JSON.parse(chunk.toString('utf8'));
        emit('docker', txt);
      });
      */
    } 
  });

};
