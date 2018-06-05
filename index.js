const express = require('express');
const app = express();
const docker = require('./index/docker');
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const ioClients = [];
const emit = (channel, data) => {
  for(const ioClient of ioClients) {
    ioClient.emit(channel, data);
  }
}
const DockerCompose = require("./index/dockercompose");

const path = require('path');
let dockerComposeFile;
if(process.env.DOCKER_COMPOSE_FILE) {
  dockerComposeFile = process.env.DOCKER_COMPOSE_FILE;
} else {
  dockerComposeFile = path.normalize(path.join(__dirname, 'sample', 'docker-compose.yml'));
}
let dockerComposeDir = path.dirname(dockerComposeFile);
const dockerCompose = DockerCompose({cwd: dockerComposeDir});

const __ = {
  app, io, ioClients, emit,
  docker, dockerCompose, dockerComposeDir, dockerComposeFile,
}

require('./index/socketio')(__);
require('./index/routes')(__);

app.use(express.static('web'));

server.listen(2999, function () {
  console.log('Example app listening on port 2999!')
});