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
const baseDir = path.normalize(path.join(__dirname, '..'));
const workspaceDir = path.join(baseDir, 'workspace');
const projectName = 'pici';
const projectDir = path.join(workspaceDir, projectName);
console.log('poject directory:', projectDir);
const dockerCompose = DockerCompose({cwd: projectDir});

const __ = {
  app, docker, dockerCompose, io, ioClients, emit, workspaceDir, projectName, projectDir
}

require('./index/socketio')(__);
require('./index/routes')(__);

app.use(express.static('web'));

server.listen(2999, function () {
  console.log('Example app listening on port 2999!')
});