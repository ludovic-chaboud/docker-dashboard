module.exports = __ => {
  const {docker, app, emit} = __;
  app.get('/containers/:containerId/remove', function(req, res) {
    const containerId = req.params.containerId;
    emit('log', 'Remove container '+containerId);
    console.log('remove:', containerId);
    const container = docker.getContainer(containerId);
    container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
      container.modem.demuxStream(stream, {write: function (data) {
        emit('log', data);
      }}, {write: function (data) {
        emit('log', data);
      }});
    });
    container.remove((err, data) => {
      if(err) {
        res.send(err);
      } else {
        emit('log', data);
        res.send(data);
      }
    });
  });
}