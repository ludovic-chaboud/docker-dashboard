module.exports = __ => {
  const {docker, app, emit} = __;
  app.get('/containers/:containerId/start', function(req, res) {
    const containerId = req.params.containerId;
    emit('log', 'Start container '+containerId);
    console.log('start:', containerId);
    const container = docker.getContainer(containerId);
    container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
      container.modem.demuxStream(stream, {write: function (data) {
        emit('log', data);
      }}, {write: function (data) {
        emit('log', data);
      }});
    });
    container.start((err, data) => {
      if(err) {
        res.send(err);
      } else {
        emit('log', data);
        res.send(data);
      }
    });
  });
}