const linkNetwork = require('./networks/network');

module.exports = __ => {
  const {networks} = __;
  for(const network of networks) {
    linkNetwork({...__, network});
  }
};