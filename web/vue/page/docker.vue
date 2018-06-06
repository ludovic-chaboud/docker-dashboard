<template>
  <div class="page row">
    <div class="col-xs-12">
      <h1 class="logo-docker">Docker</h1>
    </div>
    <div class="col-xs-12 col-lg-7">
      <div class="row">
        <div class="col-xs-12">
          <composes v-bind:composes="composes"></composes>
        </div>
        <div class="col-xs-12">
          <containers v-bind:containers="containers"></containers>
        </div>
        <div class="col-xs-12">
          <images v-bind:images="images"></images>
        </div>
        <div class="col-xs-12">
          <networks v-bind:networks="networks"></networks>
        </div>
        <div class="col-xs-12">
          <volumes v-bind:volumes="volumes"></volumes>
        </div>
        <div class="col-xs-12">
          <containers-labels v-bind:containers="containers"></containers-labels>
        </div>
        <div class="col-xs-12">
          <containers-details v-bind:containers="containers"></containers-details>
        </div>
      </div>
    </div>    
    <div class="col-xs-12 col-lg-5">
      <div class="row">
        <div class="col-xs-12">
          <logs v-bind:logs="logs"></logs>
        </div>
        <!--
        <div class="col-xs-12">
          <events v-bind:events="events"></events>
        </div>
        -->
      </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    images: httpVueLoader('vue/page/docker/images.vue'),
    containers: httpVueLoader('vue/page/docker/containers.vue'),
    containersLabels: httpVueLoader('vue/page/docker/containersLabels.vue'),
    containersDetails: httpVueLoader('vue/page/docker/containersDetails.vue'),
    events: httpVueLoader('vue/page/docker/events.vue'),
    logs: httpVueLoader('vue/page/docker/logs.vue'),
    composes: httpVueLoader('vue/page/docker/composes.vue'),
    networks: httpVueLoader('vue/page/docker/networks.vue'),
    volumes: httpVueLoader('vue/page/docker/volumes.vue'),
  },
  data() { 
    return {
      errors: [],
      message: 'Hello Vue!',
      images: [],
      containers: [],
      composes: [],
      networks: [],
      volumes: [],
      isConnected: false,
      events: [],
      logs: []
    }
  },
  created() {
    axios.get(`all`)
    .then(response => {
      console.log(response.data);
      this.images = response.data.images;
      this.containers = response.data.containers;
      this.networks = response.data.networks;
      this.volums = response.data.volumes;
      this.composes = response.data.composes;
    })
    .catch(e => {
      this.errors.push(e);
    });
    /*
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
    axios.get(`networks`)
    .then(response => {
      console.log('networks:',response.data);
      this.networks = response.data
    })
    .catch(e => {
      this.errors.push(e);
    });
    axios.get(`volumes`)
    .then(response => {
      console.log('volumes:',response.data);
      this.volumes = response.data
    })
    .catch(e => {
      this.errors.push(e);
    });
    */
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
    socket.on('networks', (data) => {
      this.networks = data;
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
.logo-docker {
  margin-left: 10px;
  background: url('../../images/docker.svg') no-repeat left;
  background-size: 50px;
  padding-left: 60px;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  padding-top: 20px;
}
</style>