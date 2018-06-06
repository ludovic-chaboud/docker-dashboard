module.exports = __ => {
  require('./routes/all')(__);
  require('./routes/images')(__);
  require('./routes/containers')(__);
  require('./routes/composes')(__);
  require('./routes/networks')(__);
  require('./routes/volumes')(__);
}