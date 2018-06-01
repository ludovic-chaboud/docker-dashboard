module.exports = (__) => {
  const {app, docker} = __;
  app.get('/containers', function(req, res) {
    docker.listContainers({all: true}, function(err, containers) {
      if(err) {
        res.send(err)
      } else {
        res.send(containers)
      }
    });
  });
  
  require('./containers/containerId')(__);

}