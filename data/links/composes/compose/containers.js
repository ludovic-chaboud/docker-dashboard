module.exports = __ => {
  const {compose, containers} = __;
  for(const service of compose.services) {
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
}