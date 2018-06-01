module.exports = __ => {
  const {docker, app, emit} = __;
  app.get('/volumes/:volumeId/remove', function(req, res) {
    const volumeId = req.params.volumeId;
    emit('log', 'Remove volume '+volumeId);
    console.log('remove:', volumeId);
    const volume = docker.getVolume(volumeId);
    volume.remove((err, data) => {
      if(err) {
        res.send(err);
      } else {
        emit('log', data);
        res.send(data);
      }
    });
  });
}