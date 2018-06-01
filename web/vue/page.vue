<template>
  <div class="page row">
    <div class="col-xs-12">
      <h1>Docker</h1>
    </div>
    <div class="col-xs-12">
      <composes v-bind:composes="composes"></composes>
    </div>
    <div class="col-xs-12">
      <images v-bind:images="images"></images>
    </div>
    <div class="col-xs-12">
      <containers v-bind:containers="containers"></containers>
    </div>
    <div class="col-xs-12">
      <containers-labels v-bind:containers="containers"></containers-labels>
    </div>
    <div class="col-xs-12">
      <containers-details v-bind:containers="containers"></containers-details>
    </div>
    <div class="col-xs-12">
      <volumes v-bind:volumes="volumes"></volumes>
    </div>
    <div class="col-xs-12">
      <logs v-bind:logs="logs"></logs>
    </div>
    <div class="col-xs-12">
      <events v-bind:events="events"></events>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    images: httpVueLoader('vue/page/images.vue'),
    containers: httpVueLoader('vue/page/containers.vue'),
    containersLabels: httpVueLoader('vue/page/containersLabels.vue'),
    containersDetails: httpVueLoader('vue/page/containersDetails.vue'),
    events: httpVueLoader('vue/page/events.vue'),
    logs: httpVueLoader('vue/page/logs.vue'),
    composes: httpVueLoader('vue/page/composes.vue'),
    volumes: httpVueLoader('vue/page/volumes.vue'),
  },
  data() { 
    return {
      errors: [],
      message: 'Hello Vue!',
      images: [],
      containers: [],
      composes: [],
      volumes: [],
      isConnected: false,
      events: [],
      logs: []
    }
  },
  created() {
    axios.get(`images`)
    .then(response => {
      console.log('images:',response.data);
      this.images = response.data
    })
    .catch(e => {
      this.errors.push(e);
    });
    axios.get(`containers`)
    .then(response => {
      console.log('containers:',response.data);
      this.containers = response.data
    })
    .catch(e => {
      this.errors.push(e);
    });
    axios.get(`composes`)
    .then(response => {
      console.log('composes:',response.data);
      this.composes = response.data
    })
    .catch(e => {
      this.errors.push(e);
    });
    this.$socket = socket;
    socket.on('connect', (data) => {
      this.isConnected = true;
    });
    socket.on('disconnect', (data) => {
      this.isConnected = false;
    });
    socket.on('images', (data) => {
      this.images = data;
    });
    socket.on('containers', (data) => {
      this.containers = data;
    });
    socket.on('composes', (data) => {
      this.composes = data;
    });
    socket.on('volumes', (data) => {
      this.volumes = data;
    });
    socket.on('docker', (data) => {
      this.events.push(data);
    });
    socket.on('log', (data) => {
      data = replaceTerminalCharacters(data);
      this.logs.push(data);
    });
  }
}
</script>

<style>
</style>