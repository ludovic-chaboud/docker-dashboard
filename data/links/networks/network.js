module.exports = __ => {
  const {network, containers} = __;
  network.containers = [];
  for(const container of containers) {
    let found = false;
    //console.log(container.NetworkSettings.Networks);
    if(container.NetworkSettings && container.NetworkSettings.Networks) {
      for(const networkName in container.NetworkSettings.Networks) {
        const networkContainer = container.NetworkSettings.Networks[networkName];
        console.log(network.Id);
        console.log(networkContainer.NetworkID);
        if(network.Id === networkContainer.NetworkID) {
          console.log(true)
          found = true;
        }
      }
    }
    if(found) {
      network.containers.push(container);
    }
  }
}
