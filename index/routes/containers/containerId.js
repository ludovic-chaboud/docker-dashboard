module.exports = __ => {
  const {docker, app} = __;
  app.get('/containers/:containerId', function(req, res) {
    const containerId = req.params.containerId;
    const container = docker.getContainer(containerId);
    res.send(container);
  });
  
  require('./containerId/start')(__);
  require('./containerId/stop')(__);
  require('./containerId/remove')(__);

}