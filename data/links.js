const linkNetworks = require('./links/networks');
const linkComposes = require('./links/composes');

module.exports = __ => {
  linkNetworks(__);
  linkComposes(__);
}