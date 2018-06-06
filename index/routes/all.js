const load = require('../../data/load');

module.exports = __ => {
  const {app, docker} = __;
  app.get('/all', function(req, res) {
    load(__)
      .then((__) => {
        res.send({
          images: __.images,
          containers: __.containers,
          networks: __.networks,
          volumes: __.volumes,
          composes: __.composes
        });
      })
      .catch(e => {
        console.error(e)
        res.send(e)
      });
  });
}