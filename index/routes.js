module.exports = __ => {
  require('./routes/images')(__);
  require('./routes/containers')(__);
  require('./routes/composes')(__);
  require('./routes/volumes')(__);
}