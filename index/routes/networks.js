module.exports = (__) => {
  const {app, docker} = __;
  app.get('/networks', function(req, res) {
    docker.listNetworks({
      }, function(err, networks) {
        if(err) {
          res.send(err)
        } else {
          res.send(networks)
        }
      });
  });
  
  require('./networks/networkId')(__);

}