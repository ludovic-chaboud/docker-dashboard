module.exports = (__) => {
  const {app, docker} = __;
  app.get('/volumes', function(req, res) {
    docker.listVolumes({
        filters: {
          dangling: true
        }
      }, function(err, volumes) {
        if(err) {
          res.send(err)
        } else {
          res.send(volumes)
        }
      });
  });
  
  require('./volumes/volumeId')(__);

}