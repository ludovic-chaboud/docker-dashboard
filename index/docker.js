const Docker = require('dockerode');
const fs     = require('fs');
const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
const stats  = fs.statSync(socket);
if (!stats.isSocket()) {
  throw new Error('Are you sure the docker is running?');
}
const docker = new Docker({ socketPath: socket });
module.exports = docker;