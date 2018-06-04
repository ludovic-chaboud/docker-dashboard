const linkCompose = require('./composes/compose');

module.exports = __ => {
  console.log('services')
  const {composes} = __;
  for(const compose of composes) {
    console.log('compose')
    linkCompose({...__, compose});
  }
};