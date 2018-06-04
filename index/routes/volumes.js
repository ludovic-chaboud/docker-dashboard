module.exports = (__) => {
  const {app, docker} = __;
  app.get('/volumes', function(req, res) {
    docker.listVolumes({
      dangling: true
      }, function(err, data) {
        if(err) {
          res.send(err)
        } else {
          const volumes = data.Volumes;
          res.send(volumes)
        }
      });
  });
  
  require('./volumes/volumeId')(__);

}