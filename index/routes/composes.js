const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const load = require('../../data/load');

module.exports = __ => {
  const {dockerCompose, app, emit, projectDir} = __;

  emit('log', 'docker-compose ps');
  app.get('/composes', function(req, res) {
    load(__)
      .then((__) => {
        res.send(__.composes);
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  });

  require('./composes/up')(__);
  require('./composes/stop')(__);
  require('./composes/rm')(__);
}
