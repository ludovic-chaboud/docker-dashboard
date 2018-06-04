module.exports = __ => {
  const {docker, app, emit} = __;
  app.get('/networks/:networkId/remove', function(req, res) {
    const networkId = req.params.networkId;
    emit('log', 'Remove network '+networkId);
    console.log('remove:', networkId);
    const network = docker.getNetwork(networkId);
    network.remove((err, data) => {
      if(err) {
        emit('log', data);
        res.send(err);
      } else {
        emit('log', data);
        res.send(data);
      }
    });
  });
}