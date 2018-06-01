module.exports = __ => {
  const {app, docker} = __;
  app.get('/images', function(req, res) {
    docker.listImages({all: true}, function(err, images) {
      if(err) {
        res.send(err)
      } else {
        res.send(images)
      }
    });
  });
  require('./images/remove')(__);
}