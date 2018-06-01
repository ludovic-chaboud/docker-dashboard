module.exports = (__) => {
  const {io, ioClients, emit} = __;
  console.log('socket.io - init');
  io.on('connection', function(client) {  
    console.log('Client connected...');
    ioClients.push(client);
    require('./socketio/docker')({...__, client});
  });
}