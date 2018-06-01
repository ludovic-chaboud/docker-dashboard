module.exports = __ => {
  const {dockerCompose, app, emit} = __;
  emit('log', 'docker-compose up');
  app.get('/composes/:composeId/up', function(req, res) {
    dockerCompose.up((data) => {
      console.log(data);
      emit('log', data);
    }, (err) => {
      console.error(err);
      emit('log', err);
    }, (data) => {
      console.log(data);
      res.send(true);
    });
  });
}