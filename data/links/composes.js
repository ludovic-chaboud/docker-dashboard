const linkCompose = require('./composes/compose');

module.exports = __ => {
  const {composes} = __;
  for(const compose of composes) {
    linkCompose({...__, compose});
  }
};