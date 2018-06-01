module.exports = __ => {
  const {docker, app, emit} = __;
  app.get('/images/:imageId/remove', function(req, res) {
    const imageId = req.params.imageId;
    emit('log', 'Remove image '+imageId);
    console.log('remove:', imageId);
    const image = docker.getImage(imageId);
    image.remove((err, data) => {
      if(err) {
        emit('log', err);
        res.send(err);
      } else {
        emit('log', data);
        res.send(data);
      }
    });
  });
}