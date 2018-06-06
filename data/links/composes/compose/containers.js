module.exports = __ => {
  const {compose, containers} = __;
  for(const service of compose.services) {
    for(const container of containers) {
      let found = false;
      for(const name of container.Names) {
        if(isLinkedToService(compose, service, container)) {
          found = true;
        }
      }
      if(found) {
        service.containers.push(container);
      }
    }
  }
}

function isLinkedToService(compose, service, container) {
  return container.Labels['com.docker.compose.project'] === compose.name
    && container.Labels['com.docker.compose.service'] === service.name
}