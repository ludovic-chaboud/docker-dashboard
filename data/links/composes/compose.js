const defineServices = require('./compose/services');
const defineContainers = require('./compose/containers');

module.exports = __ => {
  defineServices(__);
  defineContainers(__);
}