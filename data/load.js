const Q = require('q');
const loadContainers = require('./load/containers');
const loadImages = require('./load/images');
const loadNetworks = require('./load/networks');
const loadVolumes = require('./load/containers');
const loadComposes = require('./load/composes');
const defineLinks = require('./links');

module.exports = (__) => {
  return new Promise((resolve, reject) => {
    console.log('load')
    Q.all([
      loadContainers(__),
      loadImages(__),
      loadNetworks(__),
      loadVolumes(__),
      loadComposes(__),
    ])
    .then((results) => {
      let i = 0;
      __.containers = results[i++];
      __.images = results[i++];
      __.networks = results[i++];
      __.volumes = results[i++];
      __.composes = results[i++];
      defineLinks(__);
      resolve(__);
    });
  });
}