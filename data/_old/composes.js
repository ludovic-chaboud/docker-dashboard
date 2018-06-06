const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const loadContainers = require('./composes/containers');
const loadImages = require('./composes/images');

module.exports = {
  loadComposes
};

function loadComposes(__) {
  const {projectDir, dockerCompose} = __;
  const compose = getCompose(projectDir);
  if(!compose) {
    resolve([]);
    return;
  }
  const servicesByNames = {};
  const services = [];
  if(compose.config && compose.config.services) {
    for(const serviceName of Object.keys(compose.config.services)) {
      const service = {
        name: serviceName,
        service: compose.config.services[serviceName],
        containers: []
      };
      services.push(service);
      servicesByNames[serviceName] = service;
    }
  }
  compose.services = services;
  __ = {
    ...__,
    compose,
    services,
    servicesByNames
  };
  return new Promise((resolve, reject) => {
    return loadContainers(__)
      .then(() => {
        return loadImages(__);
      })
      /*
      .then(() => {
        return loadNetworks(__);
      })
      */
      .then(() => {
        resolve([compose]);
      })
      .catch(e => {
        reject(e);
      })
  })
  /*
  return loadContainers({...__, compose})
    .then((containers) => {
      __.containers = containers;
      for(const service of services) {
        for(const container of containers) {
          let found = false;
          for(const name of container.Names) {
            if(name.indexOf(`/${__.projectName}_${service.name}_`) === 0) {
              found = true;
            }
          }
          if(found) {
            service.containers.push(container);
          }
        }
      }
      return [compose];
    });
    */
}

function getCompose(dir) {
  if(fs.statSync(dir).isDirectory()) {
    const file = path.join(dir, 'docker-compose.yml');
    if(fs.existsSync(file)) {
      const name = path.basename(dir);
      const config = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
      return {
        name,
        config
      };
    }
  }
  return null;
}

function getServiceName(containerName) {
  const posBegin = containerName.indexOf('_') + 1;
  const posEnd = containerName.indexOf('_', posBegin);
  return containerName.substring(posBegin, posEnd);
}