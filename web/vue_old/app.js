var app = new Vue({
  el: '#app',
  components: {
    containers: httpVueLoader('vue/index/containers.vue')
  },
  data: {
    errors: [],
    message: 'Hello Vue!',
    containers: [],
    isConnected: false,
    dockerMessages: []
  },
  created() {
    axios.get(`containers`)
    .then(response => {
      console.log('containers:',response.data);
      this.containers = response.data
    })
    .catch(e => {
      this.errors.push(e);
    })
    this.$socket = socket;
    socket.on('connect', function(data) {
      this.isConnected = true;
    }.bind(this));
    socket.on('disconnect', function(data) {
      this.isConnected = false;
    }.bind(this));
    socket.on('docker', function(data) {
      this.dockerMessages.push(data);
    }.bind(this));
  },
  methods: {
    start: function (containerId) {
      axios.get(`containers/`+containerId+'/start')
        .then(response => {
          console.log('container start:',response.data);

        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    pingServer() {
      this.$socket.emit('pingServer', 'PING!')
    }
  }
})
