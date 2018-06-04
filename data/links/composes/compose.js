const defineServices = require('./compose/services');
const defineContainers = require('./compose/containers');

module.exports = __ => {
  console.log('compose')
  defineServices(__);
  console.log(__.compose)
  defineContainers(__);
}